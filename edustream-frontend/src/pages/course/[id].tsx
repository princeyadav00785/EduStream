"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

const CourseDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [course, setCourse] = useState<Course | null>(null);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (!id) return;

    const fetchCourseData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_COURSE_API_BASE_URL}api/courses/${String(id)}`);
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    const fetchStudentsData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_COURSE_API_BASE_URL}api/courses/${String(id)}/students-count`);
        if (!res.ok) throw new Error("Failed to fetch student count");

        const data = await res.json();
        setStudentCount(data.studentsCount);
      } catch (error) {
        console.error("Error fetching students count:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchCourseData(), fetchStudentsData()]);
      setLoading(false);
    };
    

    fetchData();
  }, [id]);

  const handleBuyCourse = async () => {
    if (!course || course.type === "FREE") return;
    setIsBuying(true);

    try {
      const response = await fetch("http://localhost:4003/api/payment/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "USER_ID_HERE", 
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

  if (loading) return <p className="text-center text-gray-600">Loading course details...</p>;
  if (!course) return <p className="text-center text-red-500">Course not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold">{course.title}</h2>
      <p className="text-gray-600 mt-2">{course.description}</p>
      <p className="mt-2 text-sm">Instructor: {course.instructor?.firstName} {course.instructor?.lastName}</p>
      <p className="mt-1 font-semibold">Price: {course.type === "FREE" ? "Free" : `₹${course.price}`}</p>
      <p className="mt-1 font-semibold">Ratings: ⭐ {course.ratings}</p>
      <p className="mt-2 text-blue-600 font-bold">Total Students Enrolled: {studentCount}</p>

      {course.type === "PAID" && (
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setShowAddressModal(true)} disabled={isBuying}>
          {isBuying ? "Processing..." : "Buy Course"}
        </button>
      )}

      {showAddressModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Enter Your Details</h3>
            <input type="text" placeholder="Full Name" className="border p-2 w-full mb-2"
              value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} />
            <input type="email" placeholder="Email" className="border p-2 w-full mb-2"
              value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />

            <h3 className="text-xl font-semibold mt-4 mb-2">Address Details</h3>
            <input type="text" placeholder="Address Line 1" className="border p-2 w-full mb-2"
              value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
            <input type="text" placeholder="City" className="border p-2 w-full mb-2"
              value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
            <input type="text" placeholder="State" className="border p-2 w-full mb-2"
              value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
            <input type="text" placeholder="Postal Code" className="border p-2 w-full mb-2"
              value={address.postal_code} onChange={(e) => setAddress({ ...address, postal_code: e.target.value })} />
            
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowAddressModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => { setShowAddressModal(false); handleBuyCourse(); }}>
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