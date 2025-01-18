'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import UserInfo from '../components/UserInfo';
import '../styles/globals.css';
import axios from 'axios';

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
  start_date: Date;
  end_date: Date;
}
const Profile: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [leaderboard, setLeaderboard] = useState<UserData[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]); // State for past events
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]); // State for upcoming events
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
        userData.profilePic = '/user-icon.svg';
        setUser(userData);
        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const userId = localStorage.getItem('userId');
          const certResponse = await axios.get(`http://localhost:5000/api/certificates/user/${user?._id}`);
          const certData = certResponse.data;
          console.log(certData);
          setCertificates(certData);
          const registrationsResponse = await axios.get('http://localhost:5000/api/registrations');
          if (!(registrationsResponse.status === 200)) {
            throw new Error('Error fetching registrations');
          }
          const userRegistrations = Array.isArray(registrationsResponse.data.data)
            ? registrationsResponse.data.data.filter(
                (registration: any) => registration.user_id === userId
              )
            : [];
          const registeredEvents = await Promise.all(
            userRegistrations.map(async (registration: any) => {
              const eventResponse = await axios.get(
                `http://localhost:5000/api/events/${registration.event_id}`
              );
              return eventResponse.data;
            })
          );
          setRegisteredEvents(registeredEvents);
          const usersResponse = await axios.get('http://localhost:5000/api/users');
          const usersData = usersResponse.data;
          const sortedUsers = usersData.sort((a: UserData, b: UserData) => b.points - a.points);
          const top = sortedUsers;
          setLeaderboard(top);
          // Filter events into upcoming and past
          const now = new Date();
          console.log(registeredEvents);
          const upcomingEvents = registeredEvents.filter(event => new Date(event.start_date) > now);
          const pastEvents = registeredEvents.filter(event => new Date(event.start_date) <= now);
          setUpcomingEvents(upcomingEvents);
          setPastEvents(pastEvents);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [user]);
  const createCertificate = async (eventId: string, eventName: string) => {
    try {
      const userId = user?._id;  // Get user ID from state
      if (!userId) {
        console.error('User ID is missing');
        return;
      }
  
      const response = await axios.post('http://localhost:5000/api/certificates', {
        userId: userId,
        eventId: eventId,
        eventName: eventName,
      });
  
      if (response.status === 201) {
        alert('Certificate created successfully!');
        setCertificates((prevCertificates) => [...prevCertificates, response.data]); // Add to state
      } else {
        alert('Failed to create certificate');
      }
    } catch (error) {
      console.error('Error creating certificate:', error);
      alert('Error creating certificate');
    }
  };
  
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
      />
      <Link href={`/registerassociation`} passHref>
        <button className="view-details-button">Register association</button>
      </Link>
      <div className="sections-container">
        
        {/* Upcoming Events */}
        <div className="events-section">
          <h2>Upcoming Events</h2>
          {upcomingEvents.map((event, index) => (
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
        {/* Past Events */}
        <div className="past-events-section">
          <h2>Past Events</h2>
          {pastEvents.map((event, index) => (
            <div key={index} className="event-card">
              <div className="event-info">
                <h3>{event.title}</h3>
              </div>
              <Link href={`/eventFeedback?event_id=${event._id}`} passHref>
                <button className="view-details-button" >Feedback</button>
              </Link>
                <button
                  className="view-details-button"
                  onClick={() => createCertificate(event._id, event.title)} // Call the function when clicked
                >
                  Create Certificate
                </button>
            </div>
          ))}
        </div>
        {/* Certificates */}
        <div className="certificates-section">
          <h2>Certificates</h2>
          {certificates.map((certificate) => (
            <div key={certificate._id} className="certificate-card">
              <p>Certificate for {certificate.eventName}</p>
              <p>Issued At: {certificate.issued_at.toString()}</p>
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
                <p>Rank: {index + 1}</p>
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