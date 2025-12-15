import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      navigate('/admin');
      return;
    }
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await api.get('/admin/members');
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const generatePairings = async () => {
    if (!window.confirm('Are you sure? This will assign new Secret Santas.')) return;
    setLoading(true);
    try {
      const res = await api.post('/admin/generate');
      setMessage(res.data.message);
      fetchMembers();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error generating pairings');
    } finally {
      setLoading(false);
    }
  };

  const resetEvent = async () => {
    if (!window.confirm('WARNING: This will clear all assignments!')) return;
    setLoading(true);
    try {
      const res = await api.post('/admin/reset');
      setMessage(res.data.message);
      fetchMembers();
    } catch (err) {
      setMessage('Error resetting event');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    window.open(`${api.defaults.baseURL}/admin/export`, '_blank');
  };

  const obfuscateName = (name) => {
    if (!name) return '';
    if (name.length <= 4) return name[0] + '*'.repeat(name.length - 1);
    return name.slice(0, 2) + '*'.repeat(5) + name.slice(-2);
  };

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-christmas-red font-mountains">Pastor's Dashboard</h1>
          <button 
            onClick={() => { localStorage.removeItem('adminAuth'); navigate('/admin'); }} 
            className="text-white hover:text-christmas-gold transition-colors font-semibold"
          >
            Logout
          </button>
        </div>

        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-christmas-gold/20 border border-christmas-gold text-christmas-gold p-4 rounded-xl mb-6 text-center font-semibold backdrop-blur-sm"
          >
            {message}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl text-center flex flex-col justify-center items-center relative group"
          >
            <button 
              onClick={fetchMembers} 
              className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              title="Refresh Data"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <h3 className="text-xl text-white mb-2 font-poppins">Total Members</h3>
            <p className="text-5xl font-bold text-christmas-gold font-mountains">{members.length}</p>
          </motion.div>
          
          {/* Actions Card */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl flex flex-col justify-center gap-4">
            <button 
              onClick={generatePairings}
              disabled={loading}
              className="btn-primary w-full shadow-lg"
            >
              Start Event 🎄
            </button>
            
            <button 
              onClick={resetEvent}
              disabled={loading}
              className="bg-red-500/80 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg backdrop-blur-sm border border-red-400"
            >
              Reset Event
            </button>
          </div>

          {/* Tools Card */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl flex flex-col justify-center gap-4">
            <button 
              onClick={downloadCSV}
              className="bg-green-600/80 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg backdrop-blur-sm border border-green-400"
            >
              Export CSV
            </button>

            {import.meta.env.VITE_ENVIRONMENT === 'Dev' && (
              <button 
                onClick={async () => {
                  if (window.confirm('DEV ONLY: This will DELETE ALL MEMBERS. Are you sure?')) {
                    try {
                      await api.post('/admin/clear-db');
                      fetchMembers();
                      alert('Database cleared!');
                    } catch (e) {
                      alert('Failed to clear DB');
                    }
                  }
                }}
                className="bg-gray-800/80 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg border border-red-500"
              >
                DEV: Clear DB
              </button>
            )}
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-black/20 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider font-poppins">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider font-poppins">Assigned To</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider font-poppins">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider font-poppins">Registered At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-white/5 transition-colors text-white/90">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-lg">{member.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.assigned_to ? (
                        <span className="text-christmas-gold font-semibold font-mono tracking-wider">
                          {obfuscateName(member.assigned_to)}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.viewed ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                          Viewed
                        </span>
                      ) : (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                          Unseen
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(member.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {members.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-400 text-lg">
                      No members registered yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
