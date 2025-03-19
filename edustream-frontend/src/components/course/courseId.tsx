"use client";

import { useState } from "react";
import useGet from "@/hooks/useGet"; 
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Course {
  id: number;
  title: string;
  description?: string;
  instructor?: {
    firstName: string;
    lastName: string;
  };
  ratings: number;
  price?: number;
  type: "FREE" | "PAID";
}

const CourseDetail = ({ id }: { id: string | string[] | undefined }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const isStudent = (userInfo?.role==="STUDENT")?false:true;
  const userID= userInfo?.id.toString();
  console.log(`user id is  ${userID}`);
  const { data: course, isLoading: courseLoading, error: courseError } = useGet<Course>(
    id ? `${process.env.NEXT_PUBLIC_COURSE_API_BASE_URL}api/courses/${String(id)}` : ""
  );

  const { data: studentData, isLoading: studentLoading, error: studentError } = useGet<{ studentsCount: number }>(
    id ? `${process.env.NEXT_PUBLIC_COURSE_API_BASE_URL}api/courses/${String(id)}/students-count` : ""
  );

  const [isBuying, setIsBuying] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [address, setAddress] = useState({
    city: "",
    country: "India",
    line1: "",
    postal_code: "",
    state: "",
  });

  const handleBuyCourse = async () => {
    if (!course || course.type === "FREE") return;
    setIsBuying(true);

    try {
      const response = await fetch("http://localhost:4003/api/payment/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userID,
          name: userDetails.name,
          email: userDetails.email,
          courseId: `${course.id}`,
          amount: course.price,
          address,
        }),
      });

      if (!response.ok) throw new Error("Payment initiation failed");

      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Try again.");
    } finally {
      setIsBuying(false);
    }
  };

  if (courseLoading || studentLoading)
    return <p className="text-center text-gray-600">Loading course details...</p>;
  if (courseError || studentError)
    return <p className="text-center text-red-500">Failed to load course details</p>;
  if (!course) return <p className="text-center text-red-500">Course not found</p>;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">{course.title}</h1>

      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
        <p className="text-gray-600 mb-4">{course.description || "No description available."}</p>

        <p className="text-gray-500 text-sm mb-4">
          👨‍🏫 Instructor:{" "}
          <span className="font-medium">
            {course.instructor?.firstName} {course.instructor?.lastName}
          </span>
        </p>

        <p className="flex items-center gap-2 mb-4 text-yellow-500 text-lg">
          ⭐ {course.ratings} / 5
          <span className="text-gray-600 text-sm">
            (Based on {studentData?.studentsCount ?? 0} students)
          </span>
        </p>

        <p className={`text-2xl font-semibold ${course.type === "FREE" ? "text-green-500" : "text-blue-500"}`}>
          {course.type === "FREE" ? "Free" : `₹${course.price}`}
        </p>

        {course.type === "PAID" && isStudent &&(
          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md w-full"
            onClick={() => setShowAddressModal(true)}
            disabled={isBuying}
          >
        {isBuying ? "Processing..." : "Buy Course"}
          </button>
        )}
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md animate-fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[480px] max-w-full border border-gray-200/40">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">💳 Complete Payment</h3>

            <div className="flex flex-col gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                  value={userDetails.name}
                  onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Address Line 1</label>
                <input
                  type="text"
                  placeholder="Street address"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                  value={address.line1}
                  onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">State</label>
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Postal Code</label>
                <input
                  type="text"
                  placeholder="12345"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                  value={address.postal_code}
                  onChange={(e) => setAddress({ ...address, postal_code: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                className="px-5 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-all"
                onClick={() => setShowAddressModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all shadow-md"
                onClick={() => {
                  setShowAddressModal(false);
                  handleBuyCourse();
                }}
              >
                Confirm & Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
