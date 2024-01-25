import React, { useState, useEffect } from 'react';

interface Props {
  duration: number; 
  onComplete: () => void;
}

const CountdownTimer: React.FC<Props> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 1000); 
  const [expired, setExpired] = useState(false);
  const [millisecondCounter, setMillisecondCounter] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1000);
        setMillisecondCounter(prevCounter => (prevCounter + 1) % 100);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setExpired(true);
      onComplete();
    }
  }, [timeLeft, onComplete]);

  const seconds = Math.floor(timeLeft / 1000);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#333',
      textShadow: '1px 1px #fff, -1px -1px #fff',
    }}>
      {expired ? (
        <div>expire</div>
      ) : (
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '0.5rem' }}>
            <span style={{ display: 'block', marginBottom: '0.25rem' }}>{seconds.toString().padStart(2, '0')}</span>
            <span style={{ fontSize: '1.5rem' }}>Seconds</span>
          </div>
          <div>
            <span style={{ display: 'block', marginBottom: '0.25rem' }}>{millisecondCounter.toString().padStart(2, '0')}</span>
            <span style={{ fontSize: '1.5rem' }}>Milliseconds</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;