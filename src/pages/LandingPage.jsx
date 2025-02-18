import React from 'react';
import Slider from '../components/slider/Slider';
import bg from '../img/background-image-4.jpg';
import Navbar from '../components/navbar/Navbar';
import ContactForm from '../components/form/ContactForm';
import CookieConsent from '../components/form/cookieComponents';
import ChatBotModal from '../components/chatbot/ChatBotModel';

const LandingPage = () => {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        fontFamily: 'sans-serif',
      }}
    >
      <div className="bg-stone-950 bg-opacity-10 h-full w-full relative flex  overflow-y-auto">
        <CookieConsent />

        <div className=" md:w-fit w-full  transform -translate-x-1/2 left-1/2 absolute ">
          <Navbar />
          <div className="text-white  bg-white w-full   h-fit flex  flex-col lg:flex-row gk-d:flex-row justify-center sm:flex-wrap md:flex-nowrap sm-md:justify-center items-center     overflow-x-hidden p-2 gap-3  md:w-fit ">
            <div className="md:w-[570px] w-full md:h-[600px] h-[420px]  min-w-[300px] max-w-[570px]  bg-black shadow-md shadow-black">
              <Slider />
            </div>
            <div
              className="md:w-[570px] bg-white w-full md:h-[600px] h-fit   min-w-[300px] max-w-[570px]  bg-cover bg-center  rounded-lg"
              // style={{
              //   backgroundImage:
              //     "url('https://cdn.dribbble.com/users/707385/screenshots/16066835/media/fbcc30c1c6c79c69f53a8573df0408d9.jpg?resize=1000x750&vertical=center')",
              // }}
            >
              <ContactForm />
            </div>
          </div>
          <p className="md:mt-4 py-2  text-center w-full bg-black md:bg-transparent  md:text-md text-xs  text-white font-bold">&#169; {" "}2024 - <a href="https://www.tltechnologies.net/" target="_blank">TL TECHNOLOGIES</a>. ALL RIGHTS  RESERVED.</p>        </div>
      </div>
      <ChatBotModal />
    </div>
  );
};

export default LandingPage;