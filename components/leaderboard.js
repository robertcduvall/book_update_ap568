import React from 'react';

const players = [
  {name: 'You', score: '27s'},
  {name: 'Aaron', score: '40s'},
  {name: 'Sophie', score: '43s'},
  {name: 'Will', score: '49s'},
  {name: 'Sydney', score: '55s'},
  {name: 'Zoe', score: '59s'}
  // ... Add the rest of the players here
];

const Leaderboard = () => {
  // Separating the "You" player from the rest of the players
  const youPlayer = players.find(player => player.name === 'You');
  const otherPlayers = players.filter(player => player.name !== 'You');

  return (
    <div className='mega-container'>
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h2>Daily Leaderboard</h2>
          <p>Did you beat your friends?</p>
        </div>
        <div className="leaderboard-table">
          <div className="leaderboard-table-header">
            <div className="leaderboard-rank">Rank</div>
            <div className="leaderboard-player">Player</div>
            <div className="leaderboard-score">Time</div>
          </div>
          {/* Rendering "You" player row separately */}
          {youPlayer && (
            <div className="leaderboard-table-row highlighted-player">
              <div className="leaderboard-rank">1</div>
              <div className="leaderboard-player">{youPlayer.name}</div>
              <div className="leaderboard-score">{youPlayer.score}</div>
            </div>
          )}
          {/* Rendering the rest of the players */}
          {otherPlayers.map((player, index) => (
            <div key={index} className={`leaderboard-table-row ${index % 2 === 0 ? 'leaderboard-even' : 'leaderboard-odd'}`}>
              <div className="leaderboard-rank">{index + 2 /* Adjusting rank for other players */}</div>
              <div className="leaderboard-player">{player.name}</div>
              <div className="leaderboard-score">{player.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
