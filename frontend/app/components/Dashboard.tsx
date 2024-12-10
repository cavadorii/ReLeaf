import React from 'react';
import '../styles/globals.css';


interface Event {
  eventName: string;
  eventDate: string;
  pointsEarned: number;
}

interface DashboardProps {
  events: Event[];
  certificates: string[];
  leaderboard: { rank: number; points: number };
}

const Dashboard: React.FC<DashboardProps> = ({ events, certificates, leaderboard }) => {
  return (
    <div className="dashboard">
      <div className="events">
        <h2>Upcoming Events</h2>
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-info">
              <h3>{event.eventName}</h3>
              <p>{event.eventDate}</p>
              <p>Points: {event.pointsEarned}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="certificates">
        <h2>Certificates</h2>
        <ul>
          {certificates.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </div>

      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <p>Rank: {leaderboard.rank}</p>
        <p>Points: {leaderboard.points}</p>
      </div>
    </div>
  );
};

export default Dashboard;
