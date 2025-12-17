import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const GiftBox = ({ onClick, isOpen, onReveal, children }) => {
  const boxControls = useAnimation();
  const lidControls = useAnimation();
  const contentControls = useAnimation();
  const glowControls = useAnimation();

  useEffect(() => {
    if (isOpen) {
      runOpenSequence();
    } else {
      // Idle spin
      boxControls.start({
        rotateY: 360,
        transition: { duration: 10, repeat: Infinity, ease: "linear" }
      });
    }
  }, [isOpen]);

  const runOpenSequence = async () => {
    // 1. Fast Spin (Reduced)
    await boxControls.start({
      rotateY: 360 * 1, // Spin only once
      transition: { duration: 0.8, ease: "easeInOut" }
    });

    // 2. Stop and orient to front
    await boxControls.start({
      rotateY: 0,
      y: 50,
      transition: { duration: 0.5, ease: "easeOut" }
    });

    // 3. Glow intensifies
    glowControls.start({
      opacity: [0, 1, 0.5],
      scale: [1, 1.5, 1.2],
      transition: { duration: 0.5 }
    });

    // 4. Lid Toss Animation (Take cue from CSS: Up/Left then Down/Left)
    lidControls.start({
      x: [0, -50, -200],
      y: [-96, -200, 100], // Starts at -6rem (-96px), goes up, then drops down
      rotateZ: [0, -25, -70],
      rotateX: [90, 45, 0], // Rotate to look like it's falling flat
      transition: { duration: 1, times: [0, 0.4, 1], ease: "easeInOut" }
    });

    // 5. Content Pop Up (Wait slightly for lid to clear)
    await new Promise(r => setTimeout(r, 300));
    await contentControls.start({
      y: -210, // Pop up slightly less high
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 12 }
    });

    // 6. Trigger Reveal Callback
    if (onReveal) onReveal();
  };

  // Gradient Styles from user request
  const boxGradient = "linear-gradient(to bottom, #762c2c, #ff0303)";
  const ribbonGradient = "linear-gradient(to bottom, #ffffff, #ffefa0)";

  return (
    <div className="relative w-48 h-48 cursor-pointer perspective-1000" onClick={onClick}>
       {/* Glow Effect */}
       <motion.div
         animate={glowControls}
         initial={{ opacity: 0 }}
         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-christmas-gold/40 rounded-full blur-3xl -z-10"
       />

       {/* 3D Container */}
       <motion.div 
         className="relative w-full h-full transform-style-3d"
         animate={boxControls}
       >
          {/* Content (Inside the box) */}
          <motion.div
            className="absolute left-0 right-0 top-0 flex justify-center items-center transform-style-3d"
            initial={{ y: 0, opacity: 0, scale: 0.5 }}
            animate={contentControls}
            style={{ zIndex: 0 }} // Inside
          >
            {/* We rotate X to make it stand up straight relative to the camera, since the box faces are rotated */}
            <div className="transform translate-y-12"> 
                {children}
            </div>
          </motion.div>

          {/* Front Face */}
          <div className="absolute inset-0 border-2 border-red-900 flex items-center justify-center transform translate-z-24"
               style={{ background: boxGradient }}>
             <div className="w-8 h-full" style={{ background: ribbonGradient }}></div>
             <div className="absolute w-full h-8" style={{ background: ribbonGradient }}></div>
          </div>
          
          {/* Back Face */}
          <div className="absolute inset-0 border-2 border-red-900 flex items-center justify-center transform -translate-z-24 rotate-y-180"
               style={{ background: boxGradient }}>
             <div className="w-8 h-full" style={{ background: ribbonGradient }}></div>
             <div className="absolute w-full h-8" style={{ background: ribbonGradient }}></div>
          </div>

          {/* Right Face */}
          <div className="absolute inset-0 border-2 border-red-900 flex items-center justify-center transform translate-x-24 rotate-y-90"
               style={{ background: boxGradient }}>
             <div className="w-8 h-full" style={{ background: ribbonGradient }}></div>
             <div className="absolute w-full h-8" style={{ background: ribbonGradient }}></div>
          </div>

          {/* Left Face */}
          <div className="absolute inset-0 border-2 border-red-900 flex items-center justify-center transform -translate-x-24 -rotate-y-90"
               style={{ background: boxGradient }}>
             <div className="w-8 h-full" style={{ background: ribbonGradient }}></div>
             <div className="absolute w-full h-8" style={{ background: ribbonGradient }}></div>
          </div>

          {/* Top Face (Lid) */}
          <motion.div 
            className="absolute inset-0 border-2 border-red-900 flex items-center justify-center origin-center"
            style={{ 
                y: '-6rem', // Start position (top of box)
                background: boxGradient
            }}
            initial={{ rotateX: 90 }}
            animate={lidControls}
          >
             <div className="w-8 h-full" style={{ background: ribbonGradient }}></div>
             <div className="absolute w-full h-8" style={{ background: ribbonGradient }}></div>
             {/* Bow */}
             <div className="absolute transform translate-z-4">
                 <div className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center relative">
                    {/* CSS Art Bow Tie */}
                    <div className="absolute w-10 h-10 border-4 border-white rounded-full -left-2 transform -skew-x-12 bg-white/20"></div>
                    <div className="absolute w-10 h-10 border-4 border-white rounded-full -right-2 transform skew-x-12 bg-white/20"></div>
                    <div className="w-6 h-6 bg-white rounded-full z-10 shadow-md"></div>
                 </div>
             </div>
          </motion.div>

          {/* Bottom Face */}
          <div className="absolute inset-0 bg-red-900 transform translate-y-24 rotate-x-90"></div>
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
