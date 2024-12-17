import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa"; // Importing social icons from react-icons

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section - Brand and About */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-gray-200">EduStream</h3>
            <p className="text-sm text-gray-400 mt-2">
              EduStream is the go-to platform for educational content,<br></br> courses, and resources for learners of all ages.
            </p>
          </div>

          {/* Center Section - Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 text-center md:text-left">
            <div>
              <h4 className="text-lg font-semibold text-gray-200">Quick Links</h4>
              <ul className="space-y-2 mt-2 text-gray-400">
                <li><a href="/about" className="hover:text-cyan-500">About Us</a></li>
                <li><a href="/courses" className="hover:text-cyan-500">Courses</a></li>
                <li><a href="/contact" className="hover:text-cyan-500">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-200">Legal</h4>
              <ul className="space-y-2 mt-2 text-gray-400">
                <li><a href="/privacy-policy" className="hover:text-cyan-500">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:text-cyan-500">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Right Section - Social Media */}
          <div className="mt-6 md:mt-0">
            <h4 className="text-lg font-semibold text-gray-200">Follow Us</h4>
            <div className="flex space-x-6 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500"
              >
                <FaFacebookF size={24} /> {/* Facebook icon */}
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400"
              >
                <FaTwitter size={24} /> {/* Twitter icon */}
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-700"
              >
                <FaLinkedinIn size={24} /> {/* LinkedIn icon */}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} EduStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
