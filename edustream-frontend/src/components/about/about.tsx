import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-3xl mx-auto text-center px-6">

        <h1 className="mt-12 text-4xl font-bold text-white mb-8 animate-fadeInUp">
          About EduStream
        </h1>

        <p className="text-lg text-gray-400 leading-relaxed mb-8 animate-fadeInUp delay-100">
          EduStream is a premier platform that provides high-quality educational content for learners worldwide. 
          Our mission is to make education accessible to everyone, regardless of their background or location.
        </p>

        <p className="text-lg text-gray-400 leading-relaxed mb-8 animate-fadeInUp delay-200">
          We offer various courses, tutorials, and resources to help learners develop skills in different fields. 
          Whether you're looking to advance your career or explore a new subject, EduStream has something for you.
        </p>

        <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-gray-800 shadow-md animate-fadeInUp delay-300">
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-gray-400 leading-relaxed">
            Our mission is to empower learners with the tools they need to succeed in their academic and professional journeys. 
            We strive to create an inclusive and supportive learning environment for individuals from all walks of life.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-white mb-8">Meet Our Team</h2>
          <div className="flex justify-center gap-10">
            <div className="text-center">
              {/* <img
                src="https://via.placeholder.com/100"
                alt="Team Member"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              /> */}
              <p className="text-white">Prince Yadav</p>
              <p className="text-sm text-gray-500">Lead Developer</p>
            </div>

            {/* <div className="text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Team Member"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <p className="text-white">Sarah Lee</p>
              <p className="text-sm text-gray-500">Head of Content</p>
            </div> */}

            {/* <div className="text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Team Member"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <p className="text-white">David Smith</p>
              <p className="text-sm text-gray-500">Lead Developer</p>
            </div> */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
