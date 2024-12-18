import React, { useState } from "react";

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
   <div className="bg-gray-950">
     <div className=" pt-32 max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-200 mb-6">Contact Us</h1>

      <p className="text-lg text-gray-600 mb-6">
        If you have any questions or need assistance, feel free to reach out to us by filling the form below.
      </p>

      {isSubmitted ? (
        <div className="bg-green-100 p-4 text-center text-green-500 rounded-md">
          <p>Thank you for contacting us! We'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-500">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-white rounded-md mt-2 bg-gray-300"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-500">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-white bg-gray-300 rounded-md mt-2"
              placeholder="johndoe@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-500">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-md mt-2 bg-gray-300"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-3 rounded-md hover:bg-cyan-600 "
          >
            Submit
          </button>
        </form>
      )}
    </div>
   </div>
  );
};

export default ContactUs;
