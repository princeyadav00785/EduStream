"use client";
import { useState } from "react";
import { useRouter } from "next/router";

const DetailCourse = () => {
  const [CourseId, setCourseId] = useState("");
  const router = useRouter();

  const handleJoinSession = () => {
    if (!CourseId.trim()) {
      alert("⚠️ Please enter a valid session ID.");
      return;
    }
    router.push(`/course/${CourseId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">🎯 Enter Course Id</h2>

      <input
        type="text"
        value={CourseId}
        onChange={(e) => setCourseId(e.target.value)}
        placeholder="Enter Session ID"
        className="w-full max-w-md p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-6"
      />

      <button
        onClick={handleJoinSession}
        className="w-full max-w-md py-3 rounded-md bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-all"
      >
        Get Course Info
      </button>
    </div>
  );
};

export default DetailCourse;
