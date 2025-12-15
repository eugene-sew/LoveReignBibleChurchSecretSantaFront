import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SantaAnimation = () => {
  const [showSanta, setShowSanta] = useState(false);

  useEffect(() => {
    // Trigger Santa every 15 seconds
    const interval = setInterval(() => {
      setShowSanta(true);
      setTimeout(() => setShowSanta(false), 8000); // Hide after animation
    }, 15000);

    // Initial trigger
    setTimeout(() => {
        setShowSanta(true);
        setTimeout(() => setShowSanta(false), 8000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Flying Santa */}
      <AnimatePresence>
        {showSanta && (
          <motion.div
            initial={{ x: '-20vw', y: '10vh' }}
            animate={{ x: '120vw', y: ['10vh', '15vh', '5vh', '10vh'] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 8, ease: "linear" }}
            className="absolute flex items-center"
          >
            <div className="text-9xl filter drop-shadow-lg transform -scale-x-100">
              🦌🛷🎅
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.5] }}
              transition={{ duration: 2, times: [0, 0.2, 0.8, 1], repeat: 2 }}
              className="absolute -top-8 -right-12 bg-white text-christmas-red font-bold p-4 text-2xl rounded-xl rounded-bl-none border-4 border-christmas-red shadow-lg whitespace-nowrap"
            >
              HO HO HO!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Snowman */}
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-8 cursor-pointer hover:scale-110 transition-transform"
        onClick={() => alert("Happy Holidays!")}
      >
        <div className="relative flex flex-col items-center">
            {/* Hat */}
            <div className="w-12 h-10 bg-black mb-[-5px] z-20 rounded-t-sm relative">
                <div className="absolute bottom-0 w-16 h-2 bg-black left-1/2 transform -translate-x-1/2 rounded-full"></div>
                <div className="absolute bottom-2 w-12 h-2 bg-red-600"></div>
            </div>
            {/* Head */}
            <div className="w-16 h-16 bg-white rounded-full shadow-inner flex items-center justify-center relative z-10">
                <div className="flex gap-2 mb-1">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
                <div className="absolute top-8 w-2 h-2 bg-orange-500 rounded-full transform translate-x-1"></div>
                <div className="absolute top-10 flex gap-1">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                </div>
            </div>
            {/* Scarf */}
            <div className="w-20 h-6 bg-red-600 rounded-full z-20 mt-[-5px] shadow-md"></div>
            {/* Body */}
            <div className="w-24 h-24 bg-white rounded-full shadow-inner mt-[-10px] flex flex-col items-center justify-center gap-3 z-0">
                <div className="w-3 h-3 bg-black rounded-full"></div>
                <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
            {/* Base */}
            <div className="w-32 h-32 bg-white rounded-full shadow-inner mt-[-15px] z-[-1]"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default SantaAnimation;
