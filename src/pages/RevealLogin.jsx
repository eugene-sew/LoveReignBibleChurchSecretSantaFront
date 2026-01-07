import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const RevealLogin = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError('');

    try {
      // Check if name exists by trying to fetch assignment
      await api.get(`/assignment?name=${encodeURIComponent(name.trim())}`);
      navigate(`/draw?name=${encodeURIComponent(name.trim())}`);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Name not found. Please check the spelling.');
      } else {
        setError('Something went wrong. Please try again.');
      }
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
              <label className="block text-left text-gray-600 mb-2 font-semibold">Enter your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="input-field text-center text-xl tracking-wide"
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
