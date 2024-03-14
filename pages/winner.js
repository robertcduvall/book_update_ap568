import React, { useState, useEffect } from 'react';
import Leaderboard from "@/components/leaderboard";
import CountdownTimer from "@/components/timer";
import Confetti from 'react-confetti';
import Head from 'next/head';

export default function Winner() {
  // State to control the display of the confetti
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Set a timer to hide the confetti after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    // Cleanup function to clear the timer if the component unmounts before the timer is up
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <main className="winner-background">
      <Head>
        <title>Anatomy Crossword</title>
      </Head>
      <div>
        {showConfetti && <Confetti width={2000} height={2000}/>}
        <Leaderboard></Leaderboard>
      </div>
      <div className="leaderboard-under-container">
        <div className="leaderboard-under-header">
          <h2>Come Back Tomorrow</h2>
          <CountdownTimer></CountdownTimer>
        </div>
      </div>
    </main>
  );
}
