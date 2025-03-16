import React, { useState } from "react";
import { WorldMapContact } from "./Map";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Handle form submission (e.g., send form data to an API)
  };

  return (
    <div className="pt-28 min-h-screen bg-black flex flex-col items-center justify-center py-16">
      <div className="max-w-2xl w-[90vw] bg-opacity-10 backdrop-blur-md bg-white/5 p-8 rounded-xl shadow-lg border border-gray-800">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Get in Touch
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Have a question? We're here to help. Fill out the form below and we'll get back to you shortly.
        </p>

        {isSubmitted ? (
          <div className="text-center bg-green-100 text-green-600 py-4 rounded-md">
            ✅ Your message has been successfully sent!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm text-gray-400">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-600 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-600 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                placeholder="johndoe@example.com"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm text-gray-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-transparent border border-gray-600 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 py-3 rounded-md text-white font-semibold"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
        <WorldMapContact />
    </div>
  );
};

export default ContactUs;
