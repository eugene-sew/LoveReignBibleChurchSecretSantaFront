import React from 'react';
import Snowfall from './Snowfall';
import SantaAnimation from './SantaAnimation';
import MouseSnowTrail from './MouseSnowTrail';
import churchBg from '../assets/church.jpg';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-poppins text-gray-800">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${churchBg})` }}
      />
      
      {/* Overlay for readability/theme */}
      <div className="fixed inset-0 z-0 bg-christmas-night/80" />

      {/* Global Animations */}
      <Snowfall />
      <SantaAnimation />
      <MouseSnowTrail />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
