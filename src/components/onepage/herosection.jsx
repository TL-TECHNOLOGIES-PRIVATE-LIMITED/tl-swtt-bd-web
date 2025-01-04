import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const buttonHover = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};

function Herosection() {
  return (
    <motion.section
      style={{
        backgroundImage:
          "url('https://i.ytimg.com/vi/eklrwiQLnzM/maxresdefault.jpg')",
      }}
      id="home"
      className="min-h-screen touch-pinch-zoom bg-cover bg-center text-white flex flex-col items-center justify-center relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      {/* Overlay for dark gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      <div className="container mx-auto text-center relative z-10 px-4">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-4"
          variants={fadeIn}
        >
          Simplify Your Visa Journey
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-6 font-medium text-gray-200"
          variants={fadeIn}
        >
          Expert guidance for hassle-free visa applications
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.button
            className="px-6 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
            whileHover={buttonHover.hover}
          >
            Get Started
          </motion.button>
          <motion.button
            className="px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition"
            whileHover={buttonHover.hover}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Herosection;
