import React from 'react';
import { motion } from 'framer-motion';

const GiftBox = ({ onClick, isOpen }) => {
  return (
    <div className="relative w-48 h-48 cursor-pointer perspective-1000" onClick={onClick}>
       {/* 3D Container */}
       <motion.div 
         className="relative w-full h-full transform-style-3d"
         animate={isOpen ? { rotateY: 360, y: 50 } : { rotateY: 360 }}
         transition={isOpen ? { duration: 0.5 } : { duration: 10, repeat: Infinity, ease: "linear" }}
       >
          {/* Front Face */}
          <div className="absolute inset-0 bg-christmas-red border-2 border-red-800 flex items-center justify-center transform translate-z-24">
             <div className="w-8 h-full bg-christmas-gold"></div>
             <div className="absolute w-full h-8 bg-christmas-gold"></div>
          </div>
          
          {/* Back Face */}
          <div className="absolute inset-0 bg-christmas-red border-2 border-red-800 flex items-center justify-center transform -translate-z-24 rotate-y-180">
             <div className="w-8 h-full bg-christmas-gold"></div>
             <div className="absolute w-full h-8 bg-christmas-gold"></div>
          </div>

          {/* Right Face */}
          <div className="absolute inset-0 bg-red-700 border-2 border-red-900 flex items-center justify-center transform translate-x-24 rotate-y-90">
             <div className="w-8 h-full bg-christmas-gold"></div>
             <div className="absolute w-full h-8 bg-christmas-gold"></div>
          </div>

          {/* Left Face */}
          <div className="absolute inset-0 bg-red-700 border-2 border-red-900 flex items-center justify-center transform -translate-x-24 -rotate-y-90">
             <div className="w-8 h-full bg-christmas-gold"></div>
             <div className="absolute w-full h-8 bg-christmas-gold"></div>
          </div>

          {/* Top Face (Lid) */}
          <motion.div 
            className="absolute inset-0 bg-red-600 border-2 border-red-800 flex items-center justify-center origin-top"
            style={{ 
                y: '-6rem', // translateY(-24)
            }}
            initial={{ rotateX: 90 }}
            animate={isOpen ? { rotateX: 210 } : { rotateX: 90 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
             <div className="w-8 h-full bg-christmas-gold"></div>
             <div className="absolute w-full h-8 bg-christmas-gold"></div>
             {/* Bow - adjusted for new orientation */}
             <div className="absolute transform translate-z-4">
                 <div className="w-16 h-16 bg-christmas-gold rounded-full shadow-lg"></div>
             </div>
          </motion.div>

          {/* Bottom Face */}
          <div className="absolute inset-0 bg-red-800 transform translate-y-24 rotate-x-90"></div>
       </motion.div>
       
       <style>{`
         .perspective-1000 { perspective: 1000px; }
         .transform-style-3d { transform-style: preserve-3d; }
         .translate-z-24 { transform: translateZ(6rem); }
         .-translate-z-24 { transform: translateZ(-6rem); }
         .translate-x-24 { transform: translateX(6rem) rotateY(90deg); }
         .-translate-x-24 { transform: translateX(-6rem) rotateY(-90deg); }
         .-translate-y-24 { transform: translateY(-6rem) rotateX(90deg); }
         .translate-y-24 { transform: translateY(6rem) rotateX(-90deg); }
       `}</style>
    </div>
  );
};

export default GiftBox;
