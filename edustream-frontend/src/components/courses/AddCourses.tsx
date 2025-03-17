"use client";

import { useState } from "react";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructorId: 1,
    ratings: 0,
    price: 0,
    type: "FREE",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Course added successfully!");
      setFormData({
        title: "",
        description: "",
        instructorId: 1,
        ratings: 0,
        price: 0,
        type: "FREE",
      });
    } else {
      alert("Failed to add course");
    }
  };

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

        <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all">
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
