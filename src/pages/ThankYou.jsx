import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const number = searchParams.get('number');
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="christmas-card p-8 w-full max-w-md z-10 text-center"
        >
          <h1 className="text-4xl text-christmas-red mb-4 font-bold">Thank You!</h1>
          <p className="text-gray-600 mb-6 text-lg">
            You have successfully registered for the Secret Santa event.
          </p>
          
          <div className="bg-christmas-gold/20 p-6 rounded-xl border-2 border-christmas-gold mb-8">
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Your Lucky Number</p>
            <p className="text-6xl font-bold text-christmas-red">{number}</p>
          </div>
          
          <p className="text-gray-500 mb-8">
            Please remember this number! You will need it to see who you are gifting when the event starts.
          </p>
          
          <button 
            onClick={() => navigate('/')}
            className="btn-primary w-full"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ThankYou;
