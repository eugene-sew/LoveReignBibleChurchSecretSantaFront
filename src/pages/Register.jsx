import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const res = await api.get('/status');
      if (res.data.started) {
        navigate('/reveal-login');
      }
    } catch (err) {
      console.error("Failed to check status");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError('');

    try {
      await api.post('/register', { name });
      navigate(`/draw?name=${encodeURIComponent(name)}`);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        // If already registered, just go to draw page
        navigate(`/draw?name=${encodeURIComponent(name)}`);
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
          <h1 className="text-4xl text-christmas-red mb-0">LoveReign</h1>
          <h2 className="text-xl text-christmas-red mb-2 font-light">Bible Church, Ho</h2>
          <h2 className="text-2xl text-christmas-green mb-8">Santa Finder</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-left text-gray-600 mb-2 font-semibold">What is your name?</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="input-field"
                required
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? 'Checking...' : 'Register for Secret Santa 🎅'}
            </button>
          </form>
          
          <div className="mt-8 text-sm text-gray-400">
            <p>Join the festive fun!</p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Register;
