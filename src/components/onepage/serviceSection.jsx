import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../../constants/datas';
import { FaArrowRight } from 'react-icons/fa'; // Example icon for interactivity

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const hoverEffect = {
  hover: { scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', transition: { duration: 0.3 } },
};

function ServiceSection() {
  return (
    <motion.div
      className="container mx-auto text-center"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h2
        className="text-4xl text-start font-bold mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h2>
      
      {/* Short service paragraph */}
      <motion.p
        className="text-lg text-start text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        We offer a wide range of services designed to help you achieve your goals. <br /> Whether you're looking for expert guidance or personalized solutions, we're here to support you every step of the way.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white shadow-lg rounded-lg"
            variants={fadeIn}
            whileHover="hover"
            
            initial="hidden"
            animate="show"
          >
            <img
              src={service.image}
              alt={service.heading}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-start mb-2">{service.heading}</h3>
            <p className="text-gray-600 text-start">{service.paragraph}</p>
            <motion.div
              className="flex items-center justify-start text-blue-500 mt-4"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span>Learn More</span>
              <FaArrowRight className="ml-2 text-xl" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ServiceSection;
