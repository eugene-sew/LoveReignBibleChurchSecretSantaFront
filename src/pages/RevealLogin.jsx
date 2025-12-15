import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const RevealLogin = () => {
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!number) return;

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/login-by-number', { number: parseInt(number) });
      // Navigate to draw page with name (since Draw.jsx uses name to fetch assignment)
      // Or we could refactor Draw.jsx to use number. 
      // For minimal refactor, we'll use the name returned by login.
      navigate(`/draw?name=${encodeURIComponent(res.data.name)}`);
    } catch (err) {
      setError('Invalid number. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="christmas-card p-8 w-full max-w-md z-10 text-center"
        >
          <h1 className="text-3xl text-christmas-red mb-2">See Who You Are</h1>
          <h2 className="text-2xl text-christmas-green mb-8">Gifting 🎁</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-left text-gray-600 mb-2 font-semibold">Enter your Lucky Number</label>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="e.g. 7"
                className="input-field text-center text-2xl tracking-widest"
                required
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Checking...' : 'See Assignment 🎁'}
            </button>
          </form>
          
          <button 
            onClick={() => navigate('/')}
            className="mt-6 text-gray-400 hover:text-gray-600 text-sm underline"
          >
            Not registered yet?
          </button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default RevealLogin;
