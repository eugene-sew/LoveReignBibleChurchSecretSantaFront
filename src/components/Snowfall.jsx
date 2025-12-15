import React, { useEffect, useState } from 'react';

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  const snowflakeChars = ['❄', '❅', '❆', '✻', '✼'];

  useEffect(() => {
    const flakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 5}s`, // Slower fall
      opacity: Math.random() * 0.7 + 0.3,
      size: `${Math.random() * 1.5 + 0.5}rem`, // Larger for icons
      char: snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)]
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-white animate-bounce-slow"
          style={{
            left: flake.left,
            top: '-20px',
            fontSize: flake.size,
            opacity: flake.opacity,
            animation: `fall ${flake.animationDuration} linear infinite`,
            textShadow: '0 0 5px rgba(255, 255, 255, 0.8)'
          }}
        >
          {flake.char}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Snowfall;
