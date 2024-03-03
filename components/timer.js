import React, { useState, useEffect } from 'react';

function CountdownTimer() {
  const calculateTimeLeft = () => {
    const now = new Date();
    // Set the target time to the next midnight
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const difference = tomorrow - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const padTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div className=''>
      <p>
        Next Puzzle In
        {timeLeft.hours ? ` ${padTime(timeLeft.hours)} : `:'00 : '}
        {timeLeft.minutes ? `${padTime(timeLeft.minutes)} : `:'00 : '}
        {timeLeft.seconds ? `${padTime(timeLeft.seconds)} `:'00'}
      </p>
    </div>
  );
}

export default CountdownTimer;
