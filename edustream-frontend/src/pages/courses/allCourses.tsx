"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_COURSE_API_BASE_URL}api/courses`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  

  if (loading) return <p className="text-center text-gray-600">Loading courses...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow-md p-4 rounded-lg border">
            <h3 className="text-xl font-bold">{course.title}</h3>
            <p className="text-gray-600">{course.description}</p>
            <p className="text-sm mt-2">Instructor: {course.instructor?.firstName} {course.instructor?.lastName}</p>
            <p className="text-sm font-semibold mt-1">
              Price: {course.type === "FREE" ? "Free" : `₹${course.price}`}
            </p>
            <Link href={`/course/${course.id}`}>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
                View Course
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
