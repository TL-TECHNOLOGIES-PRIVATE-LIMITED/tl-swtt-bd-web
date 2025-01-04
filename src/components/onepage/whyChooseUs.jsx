import React from 'react';
import { FaThumbsUp, FaHandshake, FaGlobeAmericas, FaRegCheckCircle, FaRegEye } from 'react-icons/fa';
import { motion } from 'framer-motion';

function WhyChooseUs() {
  return (
    <div className="container mx-auto text-center py-12">
      <motion.h2
        className="text-4xl font-semibold mb-6 text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Why Choose Us
      </motion.h2>
      <motion.p
        className="text-lg mb-10 text-gray-600 px-4 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Join thousands of satisfied clients who trust us to make their dreams a reality. Here's what sets us apart:
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Proven Expertise */}
        <motion.div
          className="p-8 bg-white border-2 border-gray-300 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaThumbsUp className="text-blue-500 text-6xl mb-6 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Proven Expertise</h3>
          <p className="text-gray-600">
            With over a decade of experience, our team has successfully handled thousands of applications across diverse visa categories.
          </p>
        </motion.div>

        {/* Personalized Solutions */}
        <motion.div
          className="p-8 bg-white border-2 border-gray-300 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <FaHandshake className="text-green-500 text-6xl mb-6 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personalized Solutions</h3>
          <p className="text-gray-600">
            Every case is unique. We create tailored strategies to maximize your chances of approval, ensuring the best possible outcome.
          </p>
        </motion.div>

        {/* End-to-End Support */}
        <motion.div
          className="p-8 bg-white border-2 border-gray-300 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaRegEye className="text-purple-500 text-6xl mb-6 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">End-to-End Support</h3>
          <p className="text-gray-600">
            From initial consultation to final approval, we guide you through every step of the process with 24/7 support, ensuring a seamless experience.
          </p>
        </motion.div>

        {/* Global Reach */}
        <motion.div
          className="p-8 bg-white border-2 border-gray-300 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <FaGlobeAmericas className="text-teal-500 text-6xl mb-6 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Global Reach</h3>
          <p className="text-gray-600">
            We assist clients with visa applications for over 100 countries, offering unmatched expertise and knowledge of global immigration processes.
          </p>
        </motion.div>

        {/* Transparent Process */}
        <motion.div
          className="p-8 bg-white border-2 border-gray-300 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <FaRegCheckCircle className="text-orange-500 text-6xl mb-6 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Transparent Process</h3>
          <p className="text-gray-600">
            We maintain complete transparency, with no hidden fees or surprises. Stay informed every step of the way with regular progress updates.
          </p>
        </motion.div>

        {/* High Success Rate */}
        <motion.div
          className="p-8 bg-white border-2 border-gray-300 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
        >
          <FaThumbsUp className="text-yellow-500 text-6xl mb-6 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">High Success Rate</h3>
          <p className="text-gray-600">
            Our attention to detail and thorough application process ensures a high success rate, giving your application the best chance for approval.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
