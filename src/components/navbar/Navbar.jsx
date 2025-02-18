import React, { useState } from 'react';
import logo from '../../img/skyworldLogo2.png';
import SocialMediaIcons from '../icons/SocialMediaIcons';
import { IoClose } from 'react-icons/io5';
import { CgDetailsMore } from 'react-icons/cg';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const titleStyle = {
    
    fontWeight: 'bold',
    color: 'white',
    // WebkitTextStroke: '1px white',
    textStroke: '1px black',
    textShadow: 
      '-2px -2px 4px rgba(0,0,0,0.5), ' +  // Enhanced shadow with slight blur and transparency
      '2px -2px 4px rgba(0,0,0,0.5), ' +
      '-2px 2px 4px rgba(0,0,0,0.5), ' +
      '2px 2px 4px rgba(0,0,0,0.5)',
    textAlign: 'center'
};
  return (
    <div className="w-full relative h-fit  bg-opacity-80 items-end justify-between pt-4 py-2 flex ">
      <div className="font-bold w-full  flex flex-wrap  justify-between items-center">
        <div className="flex justify-between w-full items-end gap-4">
          <div className="text-3xl h-fit w-fit rounded-full text-[50px]">
            <img src={logo} alt="" style={{ width: '6rem' }}  className="rounded-xl" />
          </div>
          <div style={titleStyle} className='md:text-3xl  text-base'>
      SKY WORLD TOURS AND TRAVELS
    </div>
        </div>
      </div>
      <div className={`md:hidden  absolute top-0 right-0 z-50 w-full bg-stone-950 flex flex-col text-bl items-center transition-transform duration-300 ease-in-out ${menuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
        <SocialMediaIcons  link={"#"} title={<span className='text-white'>HOME</span>} />
        <SocialMediaIcons link={"#"} title={<span className='text-white'>TOUR PACKAGES</span>} />
        <SocialMediaIcons link={"#"} title={<span className='text-white'>ABOUT</span>} />
        <SocialMediaIcons link={"#"} title={<span className='text-white'>GALLERY</span>} />
      </div>
      {/* <div className="md:flex sm:hidden hidden gap-3 z-50 text-[18px] items-end h-fit flex-wrap text-stone-950 text-opacity-90 justify-start rounded-lg">
      <SocialMediaIcons  link={"http://sangitl2020-001-site7.atempurl.com/index.html"} title={<span className='text-white'>HOME</span>} />
        <SocialMediaIcons link={"http://sangitl2020-001-site7.atempurl.com/products.html"} title={<span className='text-white'>PRODUCTS & SERVICES</span>} />
        <SocialMediaIcons link={"http://sangitl2020-001-site7.atempurl.com/about.html"} title={<span className='text-white'>ABOUT</span>} />
        <SocialMediaIcons link={"http://sangitl2020-001-site7.atempurl.com/contact.html"} title={<span className='text-white'>BLOGS</span>} />
      </div> */}
      {/* <button onClick={toggleMenu} className='w-fit absolute top-2 right-2 p-1 flex md:hidden bg-stone-200 z-50 text-red-400 rounded-lg'>
        {menuOpen ? <IoClose /> : <CgDetailsMore />}
      </button> */}
    </div>
  );
}

export default Navbar;
