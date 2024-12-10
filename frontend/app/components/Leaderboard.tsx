// src/components/Leaderboard.tsx
import React from 'react';
import '../styles/globals.css';

interface LeaderboardProps {
  rank: number;
  points: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ rank, points }) => {
  return (
    <div className="leaderboard">
      <h3>Leaderboard Status</h3>
      <p>Rank: {rank}</p>
      <p>Total Points: {points}</p>
    </div>
  );
};

export default Leaderboard;
