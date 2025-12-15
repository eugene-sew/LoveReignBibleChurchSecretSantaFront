import React from 'react';
import { motion } from 'framer-motion';

const NameCard = ({ name }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="relative z-20 bg-white text-christmas-night p-8 rounded-xl shadow-2xl border-4 border-christmas-gold text-center max-w-md mx-auto transform rotate-2"
    >
      <h3 className="text-xl text-gray-500 font-semibold mb-2 uppercase tracking-widest">You are the Secret Santa for</h3>
      <h1 className="text-5xl font-bold text-christmas-red mb-4">{name}</h1>
      <p className="text-sm text-gray-400">May your gift bring joy!</p>
      
      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 text-4xl">🎄</div>
      <div className="absolute -bottom-4 -left-4 text-4xl">🎁</div>
    </motion.div>
  );
};

export default NameCard;
