"use client";

import Link from "next/link";
import useGet from "@/hooks/useGet"; // ✅ Import useGet hook

interface Course {
  id: number;
  title: string;
  description?: string;
  instructor?: {
    firstName: string;
    lastName: string;
  };
  price?: number;
  type: "FREE" | "PAID";
}

const AllCourses = () => {
  const { data: courses, isLoading, error } = useGet<Course[]>(
    `${process.env.NEXT_PUBLIC_COURSE_API_BASE_URL}api/courses`
  );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        📚 Explore Top Courses
      </h2>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center text-lg font-semibold">
          ❌ {error}
        </p>
      )}

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-200 h-64 rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses?.map((course) => (
            <div
              key={course.id}
              className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 
                hover:scale-105 transition-transform duration-300 
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md"
            >
              <div className="absolute top-4 right-4 text-sm px-3 py-1 rounded-full text-white 
                font-medium uppercase tracking-wider 
                bg-gradient-to-r from-blue-500 to-indigo-600">
                {course.type === "FREE" ? "Free" : "Paid"}
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 line-clamp-2 mb-4">
                {course.description || "No description provided."}
              </p>

              {course.instructor && (
                <p className="text-sm text-gray-500">
                  Instructor:{" "}
                  <span className="font-medium">
                    {course.instructor.firstName} {course.instructor.lastName}
                  </span>
                </p>
              )}

              <div className="mt-5 flex justify-between items-center">
                <p
                  className={`text-lg font-semibold ${
                    course.type === "FREE" ? "text-green-500" : "text-blue-500"
                  }`}
                >
                  {course.type === "FREE" ? "Free" : `₹${course.price}`}
                </p>

                <Link href={`/course/${course.id}`}>
                  <button className="px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all">
                    View Course
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
