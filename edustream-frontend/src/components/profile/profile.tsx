import useGet from "@/hooks/useGet";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
interface UserProfile {
  id: number;
  username: string;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  address?: string;
  profileCompletion: number;
  role: string;
  accountStatus: string;
  lastLogin?: string;
  imageLink?: string;
  enrolledCourses?: string[];
  coursePurchaseDates?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

const ProfilePage: React.FC = () => {
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    let id:string ="user";
    if (userInfo != null) {
      id=userInfo.id;
    }
  
  const { data, isLoading, error } = useGet<{ user: UserProfile }>(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/profile/${id}`);

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!data?.user) return <p className="text-center text-gray-500">User not found.</p>;

  const user = data.user;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <img
          src={user.imageLink || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200"
        />

        {/* User Info */}
        <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
        <p className="text-gray-500">@{user.username}</p>
        <p className="text-gray-700 mt-2">{user.email}</p>
        {user.phoneNumber && <p className="text-gray-700">{user.phoneNumber}</p>}
        {user.dateOfBirth && (
          <p className="text-gray-500 text-sm">
            DOB: {new Date(user.dateOfBirth).toLocaleDateString()}
          </p>
        )}

        <p className="mt-3 text-sm text-gray-600">Role: <span className="font-medium">{user.role}</span></p>
        <p className="text-sm text-gray-600">Status: <span className="font-medium">{user.accountStatus}</span></p>
        {/* <p className="text-sm text-gray-600">Profile Completion: <span className="font-medium">{user.profileCompletion}%</span></p> */}
        {/* <p className="text-sm text-gray-600">Last Login: <span className="font-medium">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</span></p> */}

        {/* Enrolled Courses */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Enrolled Courses</h3>
          <ul className="mt-2">
            {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
              user.enrolledCourses.map((course) => (
                <li key={course} className="bg-gray-200 text-gray-700 rounded-md px-4 py-2 mt-2">
                  {course} - Purchased on{" "}
                  {user.coursePurchaseDates?.[course]
                    ? new Date(user.coursePurchaseDates[course]).toLocaleDateString()
                    : "N/A"}
                </li>
              ))
            ) : (
              <p className="text-gray-500 mt-2">No courses enrolled.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
