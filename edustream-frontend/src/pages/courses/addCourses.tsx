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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Add a New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Course Description"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="ratings"
          placeholder="Ratings (0-5)"
          className="w-full p-2 border rounded"
          value={formData.ratings}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          className="w-full p-2 border rounded"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <select
          name="type"
          className="w-full p-2 border rounded"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="FREE">Free</option>
          <option value="PAID">Paid</option>
        </select>
        <button className="w-full bg-blue-600 text-white p-2 rounded">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
