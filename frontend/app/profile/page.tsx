'use client';
import React, { useState } from 'react';
import UserInfo from '../components/UserInfo'; 
import '../styles/globals.css';

const Profile: React.FC = () => {
  const [user] = useState({
    username: 'John Smith',
    profilePic: '/user-icon.svg',
    location: 'San Francisco, CA',
    points: 1570,
    nrTrees: 200
  });

  const events = [
    { eventName: 'Tree Planting', eventDate: '2024-12-20', pointsEarned: 50 },
    { eventName: 'Environmental Cleanup', eventDate: '2024-12-25', pointsEarned: 30 },
  ];

  const certificates = ['Tree Planting Certificate', 'Eco-Friendly Volunteer Certificate'];

  const leaderboard = [
    { username: 'John Smith', rank: 1, points: 150 },
    { username: 'Jane Doe', rank: 2, points: 130 },
    { username: 'Alice Green', rank: 3, points: 110 },
    { username: 'Bob Brown', rank: 4, points: 90 },
  ];

  return (
    <div className="profile-page">
      <UserInfo 
        username={user.username} 
        profilePic={user.profilePic} 
        location={user.location}
        points = {user.points}
        nrTrees={user.nrTrees}
      />
      
      {/* Section container for events, certificates, and leaderboard */}
      <div className="sections-container">
        
        {/* Upcoming Events */}
        <div className="events-section">
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

        {/* Certificates */}
        <div className="certificates-section">
          <h2>Certificates</h2>
          {certificates.map((certificate, index) => (
            <div key={index} className="certificate-card">
              <p>{certificate}</p>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="leaderboard-section">
          <h2>Leaderboard</h2>
          <div className="leaderboard-cards">
            {leaderboard.map((userItem, index) => (
              <div
                key={index}
                className={`leaderboard-card ${userItem.username === user.username ? 'current-user' : ''}`}
              >
                <p>Rank: {userItem.rank}</p>
                <p>Username: {userItem.username}</p>
                <p>Points: {userItem.points}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
