import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import confetti from 'canvas-confetti';
import GiftBox from '../components/GiftBox';
import NameCard from '../components/NameCard';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';

const Draw = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState(null);
  const [pickedNumber, setPickedNumber] = useState(null);
  const [viewed, setViewed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const [pickedNumbers, setPickedNumbers] = useState([]);

  useEffect(() => {
    if (!name) {
      navigate('/');
      return;
    }
    fetchAssignment();
    fetchPickedNumbers();
  }, [name]);

  const fetchPickedNumbers = async () => {
    try {
      const res = await api.get('/picked-numbers');
      setPickedNumbers(res.data);
    } catch (err) {
      console.error("Failed to fetch picked numbers");
    }
  };

  const fetchAssignment = async () => {
    try {
      const res = await api.get(`/assignment?name=${encodeURIComponent(name)}`);
      
      if (res.data.picked_number) {
          setPickedNumber(res.data.picked_number);
      }

      if (res.data.assigned_to) {
        setAssignment(res.data.assigned_to);
        if (res.data.viewed) {
          setViewed(true);
          setIsOpen(true);
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Name not found. Please register first!');
      } else {
        console.error('Fetch error:', err);
        setError('Connection error. Please check if the backend is reachable.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePickNumber = async (num) => {
    try {
        await api.post('/pick', { name, number: num });
        setPickedNumber(num);
        // Navigate to Thank You page
        navigate(`/thank-you?number=${num}`);
    } catch (err) {
        if (err.response && err.response.status === 409) {
            alert(err.response.data.error);
            fetchPickedNumbers(); // Refresh list if collision
        } else {
            console.error("Failed to pick number", err);
        }
    }
  };

  const handleOpen = async () => {
    if (isOpen) return;
    if (!assignment) {
        alert("The Pastor hasn't generated the pairings yet! Please wait for the event to start.");
        return;
    }
    
    setIsOpen(true);
    fireConfetti();
    
    try {
      await api.post('/viewed', { name });
    } catch (err) {
      console.error('Failed to mark as viewed', err);
    }
  };

  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#B30000', '#0F7C0F', '#FFD700']
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#B30000', '#0F7C0F', '#FFD700']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white bg-christmas-night">Loading...</div>;

  return (
    <Layout>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl md:text-5xl text-christmas-gold mb-8 text-center drop-shadow-lg font-bold">
          Hello, {name}!
        </h1>

        {error ? (
          <div className="christmas-card p-8 text-center">
            <p className="text-xl text-christmas-red">{error}</p>
            <button onClick={() => navigate('/')} className="mt-4 btn-secondary">Go Back</button>
          </div>
        ) : (
          <>
            {!pickedNumber ? (
                <div className="w-full max-w-5xl h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    <p className="text-white text-center mb-8 text-xl sticky top-0 bg-black/20 backdrop-blur-md py-4 rounded-lg z-10">Pick a number to discover who you will bless this Christmas! 🎄</p>
                    <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3 pb-8">
                        {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => {
                            const isTaken = pickedNumbers.includes(num);
                            return (
                                <motion.button
                                    key={num}
                                    disabled={isTaken}
                                    whileHover={!isTaken ? { scale: 1.1 } : {}}
                                    whileTap={!isTaken ? { scale: 0.9 } : {}}
                                    onClick={() => handlePickNumber(num)}
                                    className={`aspect-square border-2 rounded-xl flex items-center justify-center text-2xl font-bold transition-colors shadow-lg
                                        ${isTaken 
                                            ? 'bg-gray-500/50 border-gray-600 text-gray-400 cursor-not-allowed' 
                                            : 'bg-white/10 backdrop-blur-sm border-christmas-gold/30 text-white hover:bg-christmas-gold hover:text-christmas-red'
                                        }`}
                                >
                                    {num}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            ) : (
              <div className="flex flex-col items-center w-full max-w-2xl h-96 justify-center relative">
                {!isOpen && (
                    <p className="text-white mb-8 text-xl animate-pulse">
                        {assignment 
                            ? `You picked Gift #${pickedNumber}! Tap to open!` 
                            : `You picked Gift #${pickedNumber}! Waiting for the event to start...`}
                    </p>
                )}
                
                <div className="flex flex-col items-center justify-center min-h-[600px] w-full gap-8">
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div 
                                initial={{ scale: 0, opacity: 0, y: 50 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="z-50 w-full max-w-md px-4"
                            >
                                <NameCard name={assignment} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="relative z-10">
                        <GiftBox onClick={handleOpen} isOpen={isOpen} />
                    </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Draw;
