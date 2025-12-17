import React from 'react';
import { motion } from 'framer-motion';

const NameCard = ({ name }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="relative z-50 bg-gradient-to-br from-white to-gray-100 text-christmas-night p-6 rounded-3xl shadow-2xl border-4 border-christmas-gold text-center w-80 md:w-96 lg:w-[32rem] mx-auto"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-christmas-gold/30 rounded-t-2xl"></div>
      <h3 className="text-lg text-gray-500 font-semibold mb-2 uppercase tracking-widest mt-2">You are the Secret Santa for</h3>
      <h1 className="text-4xl md:text-5xl font-bold text-christmas-red mb-4 drop-shadow-sm">{name}</h1>
      <p className="text-sm text-gray-400 italic">May your gift bring joy!</p>
      
      {/* Decorative elements */}
      <div className="absolute -top-3 -right-3 text-3xl animate-bounce">🎄</div>
      <div className="absolute -bottom-3 -left-3 text-3xl animate-pulse">🎁</div>
    </motion.div>
  );
};

export default NameCard;
