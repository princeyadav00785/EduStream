"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import usePost from "@/hooks/usePost"; 

const AddCourse = () => {
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructorId: 1,
    ratings: 0,
    price: 0,
    type: "FREE",
  });

  const { data, isLoading, error, postData } = usePost(
    `${process.env.NEXT_PUBLIC_COURSE_API_BASE_URL}api/courses`
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "ratings" || name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postData(formData);
  };


  useEffect(() => {
    if (data) {
      setTimeout(() => {
        router.push("/courses/AllCourses");
      }, 1000); 
    }
  }, [data, router]);

  return (
    <div className="my-12 max-w-[500px] mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-center">➕ Add a New Course</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="input-label">Course Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. React Masterclass"
            className="input-field"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="input-label">Course Description</label>
          <textarea
            name="description"
            placeholder="Brief course details..."
            className="input-field h-24 resize-none"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="input-label">Ratings (0-5)</label>
            <input
              type="number"
              name="ratings"
              min="0"
              max="5"
              step="0.1"
              className="input-field"
              value={formData.ratings}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="input-label">Price (₹)</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              className="input-field"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="input-label">Course Type</label>
          <select
            name="type"
            className="input-field"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="FREE">Free</option>
            <option value="PAID">Paid</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          className={`w-full py-3 rounded-md font-semibold text-white transition-all ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Adding Course..." : "Add Course"}
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-4">❌ {error}</p>}

      {/* Success Message */}
      {data && (
        <p className="text-green-500 text-center mt-4">
          ✅ Course Added Successfully! Redirecting...
        </p>
      )}
    </div>
  );
};

export default AddCourse;
