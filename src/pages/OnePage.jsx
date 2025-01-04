import React from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaGlobe,
  FaShieldAlt,
  FaCommentDots,
  FaClock,
} from "react-icons/fa"; // Import icons from react-icons
import { FiMenu } from "react-icons/fi"; // Menu icon
import logo from "../img/skyworldLogo.png";
import {services} from "../constants/datas";
import WhyChooseUs from "../components/onepage/whyChooseUs";
import Herosection from "../components/onepage/herosection";
import ServiceSection from "../components/onepage/serviceSection";
function OnePage() {
  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-3xl h-fit w-fit rounded-full text-[50px]">
            <img
              src={logo}
              alt="Skyworld Logo"
              style={{ width: "6rem" }}
              className="rounded-xl"
            />
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="text-gray-800 hover:text-blue-600 transition">
              Home
            </a>
            <a href="#services" className="text-gray-800 hover:text-blue-600 transition">
              Services
            </a>
            <a href="#about" className="text-gray-800 hover:text-blue-600 transition">
              About
            </a>
            <a href="#choose" className="text-gray-800 hover:text-blue-600 transition">
              Why Choose Us
            </a>
            <a href="#testimonials" className="text-gray-800 hover:text-blue-600 transition">
              Testimonials
            </a>
            <a href="#contact" className="text-gray-800 hover:text-blue-600 transition">
              Contact Us
            </a>
          </div>
          <div className="hidden md:block">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Book Consultation
            </button>
          </div>
          <div className="md:hidden">
            <FiMenu size={24} className="text-gray-800" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Herosection/>

      {/* Services Section */}
      <motion.section
        id="services"
        className="py-20 bg-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
       <ServiceSection/>

      </motion.section>

      {/* Repeat the same pattern for other sections */}
      {/* Why Choose Us Section */}
      <motion.section
        id="choose"
        className="py-20 bg-gray-100 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
      <WhyChooseUs />

      </motion.section>

      {/* Continue for Testimonials and Contact Us */}
    </div>
  );
}

export default OnePage;
