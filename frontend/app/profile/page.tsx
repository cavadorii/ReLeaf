'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link from Next.js
import UserInfo from '../components/UserInfo';
import '../styles/globals.css';
import axios from 'axios';

// Interface for user data
interface UserData {
  _id: string;
  username: string;
  profilePic: string;
  location: string;
  points: number;
  nrTrees: number;
}

interface Certificate {
  _id: string;
  user_id: string;
  event_id: string;
  issued_at: Date;
  eventName: string;
}

interface Event {
  _id: string;
  title: string;
  startDate: Date;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [leaderboard, setLeaderboard] = useState<UserData[]>([]); // Changed to UserData array for correct typing

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        const userData = await response.data;
        userData.profilePic = '/user-icon.svg'; // Set a default profile picture
        setUser(userData);
        console.log(userData); // Logs user data when fetched
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []); // Runs only once when the component mounts
  
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const userId = localStorage.getItem('userId');
          // Fetch certificates for the user
          const certResponse = await axios.get(`http://localhost:5000/api/certificates/user/${user?._id}`);
          const certData = certResponse.data;
          setCertificates(certData);
          
          // Fetch user registrations
          const registrationsResponse = await axios.get('http://localhost:5000/api/registrations');
          if (!(registrationsResponse.status === 200)) {
            throw new Error('Error fetching registrations');
          }

          console.log('Registrations Response:', registrationsResponse.data);


          // Filter registrations for the logged-in user
          const userRegistrations = Array.isArray(registrationsResponse.data.data)
            ? registrationsResponse.data.data.filter(
                (registration: any) => registration.user_id === userId
              )
            : [];


          // Fetch full event details for each registration
          const registeredEvents = await Promise.all(
            userRegistrations.map(async (registration: any) => {
              const eventResponse = await axios.get(
                `http://localhost:5000/api/events/${registration.event_id}`
              );
              return eventResponse.data;
            })
          );

          setRegisteredEvents(registeredEvents);

          // Fetch all users for the leaderboard
          const usersResponse = await axios.get('http://localhost:5000/api/users');
          const usersData = usersResponse.data;

          // Sort users by points in descending order
          const sortedUsers = usersData.sort((a: UserData, b: UserData) => b.points - a.points);
          const top = sortedUsers.slice(0, 3);
          setLeaderboard(top); // Set sorted users into leaderboard state

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [user]); // This useEffect runs when 'user' is updated

  // If user data is not available yet, show a loading state
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <UserInfo 
        username={user.username} 
        profilePic={user.profilePic} 
        location={user.location}
        points={user.points}
        nrTrees={user.nrTrees}
      />
      
      {/* Section container for events, certificates, and leaderboard */}
      <div className="sections-container">
        
        {/* Upcoming Events */}
        <div className="events-section">
          <h2>Upcoming Events</h2>
          {registeredEvents.map((event, index) => (
            <div key={index} className="event-card">
              <div className="event-info">
                <h3>{event.title}</h3>
              </div>
              <Link href={`/event?id=${event._id}`} passHref>
                <button className="view-details-button">Details</button>
              </Link>
            </div>
          ))}
        </div>

        {/* Certificates */}
        <div className="certificates-section">
          <h2>Certificates</h2>
          {certificates.map((certificate) => (
            <div key={certificate._id} className="certificate-card">
              <p>Certificate id: {certificate._id}</p>
              <p>Issued At: {certificate.issued_at.toString()}</p>
              {/* Use Link to navigate to the certificate details page */}
              <Link href={`/certificate?id=${certificate._id}`} passHref>
                <button className="view-details-button">View/Download</button>
              </Link>
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
                <p>Rank: {index + 1}</p> {/* Display rank based on index */}
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
