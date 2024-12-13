import React, { useState, useEffect } from 'react';
import { services } from '../../constants/datas';
import servicetag from '../../img/tag.png';
import { IoCloseCircle } from 'react-icons/io5';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

const Slider = () => {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [rotationCount, setRotationCount] = useState(0);
  const [isBrochureVisible, setIsBrochureVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Helper function to get current image based on rotation count
  const getCurrentImage = () => {
    const currentService = services[currentServiceIndex];
    if (Array.isArray(currentService.image)) {
      const imageIndex = rotationCount % currentService.image.length;
      return currentService.image[imageIndex];
    }
    return currentService.image;
  };

  // Handle service rotation with autoplay
  useEffect(() => {
    let serviceInterval;
    if (isAutoPlay) {
      serviceInterval = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => clearInterval(serviceInterval);
  }, [isAutoPlay, currentServiceIndex]);

  const handleNext = () => {
    setCurrentServiceIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % services.length;
      // If we've completed a full rotation
      if (nextIndex === 0) {
        setRotationCount(prev => prev + 1);
      }
      return nextIndex;
    });
    setIsAutoPlay(true);
  };

  const handlePrev = () => {
    setCurrentServiceIndex((prevIndex) => {
      const nextIndex = prevIndex === 0 ? services.length - 1 : prevIndex - 1;
      // If we're going back to the last slide from the first
      if (prevIndex === 0) {
        setRotationCount(prev => Math.max(0, prev - 1));
      }
      return nextIndex;
    });
    setIsAutoPlay(true);
  };

  const isLastService = currentServiceIndex === services.length - 1;

  const splitHeading = (heading) => {
    const parts = heading.split('(');
    if (parts.length > 1) {
      return (
        <>
          {parts[0].trim()}
          <span className="text-sm font-medium">{" "}- {" "}{parts[1].replace("(", " ").replace(")", " ")}</span>
        </>
      );
    }
    return heading;
  };

  return (
    <div className="relative w-full h-full overflow-x-hidden">
      {/* Slide Counter */}
      
      <div className="absolute top-4 left-4 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-black bg-opacity-60 backdrop-blur-sm text-white px-4 py-2 rounded-xl border border-white border-opacity-20">
            <span className="md:text-xl text-xl font-bold">{currentServiceIndex + 1}</span>
            <span className="md:text-lg text-base font-medium text-gray-300 mx-1">/</span>
            <span className="md:text-lg text-base font-medium text-gray-300">{services.length}</span>
          </div>
        </div>
      </div>

      <div className="absolute top-[-7px] bg-white rounded-lg right-0 z-40">
        {isLastService ? (
          <motion.img
            key="service-tag"
            src={servicetag}
            alt="Service Tag"
            className="md:h-12 h-10 w-auto z-40"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <img src={servicetag} alt="Tag" className="md:h-12 h-10 w-auto z-40" />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 flex items-center z-50">
        <button
          onClick={handlePrev}
          className="bg-black bg-opacity-50 p-2 rounded-r-lg hover:bg-opacity-75 transition-all"
          aria-label="Previous slide"
        >
          <IoIosArrowBack className="text-white text-2xl" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center z-50">
        <button
          onClick={handleNext}
          className="bg-black bg-opacity-50 p-2 rounded-l-lg hover:bg-opacity-75 transition-all"
          aria-label="Next slide"
        >
          <IoIosArrowForward className="text-white text-2xl" />
        </button>
      </div>

      {isBrochureVisible && selectedDocument !== null ? (
        <div className="w-full h-full flex justify-center relative items-center">
          <iframe
            src={selectedDocument}
            className="w-full h-full"
            title="Brochure"
          />
          <div className="absolute bottom-4 left-5">
            <button
              className="border border-black flex gap-2 text-2xl bg-white shadow-md text-red-500 p-2 rounded-full z-50"
              onClick={() => setIsBrochureVisible(false)}
            >
              <IoCloseCircle />
            </button>
          </div>
        </div>
      ) : isBrochureVisible && selectedDocument === null ? (
        <div className="w-full h-full relative flex bg-stone-50 justify-center items-center text-3xl font-bold text-red-500">
          <button
            className="absolute bottom-0 left-0 flex gap-2 text-2xl shadow-md text-red-500 p-2 rounded-full z-50"
            onClick={() => setIsBrochureVisible(false)}
          >
            <IoCloseCircle />
          </button>
          <Typewriter
            options={{
              strings: ['Coming Soon', 'Stay tune !'],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
            }}
          />
        </div>
      ) : (
        <motion.img
          key={`image-${currentServiceIndex}-${rotationCount}`}
          src={getCurrentImage()}
          alt="Slider Image"
          initial={{ opacity: 0.0, x: 20 }}
          animate={{ opacity: 0.5, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full h-full object-cover z-30"
        />
      )}

      {!isBrochureVisible && (
        <div className="absolute inset-0 flex flex-col md:gap-4 gap-2 items-start justify-end text-start text-white p-4">
          <motion.h2
            key={`heading-${currentServiceIndex}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="md:text-[28px] text-[22px] font-bold mb-2 leading-tight bg-clip-text"
            style={{ lineHeight: 1 }}
          >
            {splitHeading(services[currentServiceIndex].heading)}
          </motion.h2>

          <motion.ul
            key={`paragraph-${currentServiceIndex}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="md:text-lg text-xs leading-3 ps-1 font-normal text-stone-300 list-disc pl-5"
          >
            {services[currentServiceIndex].paragraph.split('. ').map((sentence, index) => (
              <li className='list-none' key={index} ><em className='border-s-2 border-yellow-400 pl-1'>{sentence.trim()}</em></li>
            ))}
          </motion.ul>

          <div className="flex items-center w-full justify-between">
            <a
              className="w-fit text-transparent"
              target="_blank"
              href="https://api.whatsapp.com/send/?phone=%2B919061432814&text=Hello%2C+I+am+interested+to+know+more+about+TL-+PRODUCTS+%26+SERVICES&type=phone_number&app_absent=0"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
            <div className="flex w-fit gap-2 justify-center">
              {services.map((_, index) => (
                <div
                  key={`service-indicator-${index}`}
                  className={`h-2 rounded-full transition-all duration-500 ease-in-out ${
                    currentServiceIndex === index ? 'w-10 bg-stone-500' : 'w-2 bg-stone-800'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;