'use client'; 
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import '../styles/globals.css';

const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVolunteer, setIsVolunteer] = useState<boolean>(false);
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id');
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndEvent = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId || !eventId) {
        setError('User or Event ID not found.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
        if (!(userResponse.status == 200)) {
          throw new Error('User not found');
        }
        const userData = userResponse.data;
        if (userData.role === 'volunteer') {
          setIsVolunteer(true);
        }

        const eventResponse = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        if (!(eventResponse.status == 200)) {
          throw new Error('Error fetching event details');
        }
        const eventData = eventResponse.data;

        const volunteers = eventData.volunteers || [];
      
        // Check if the user has already joined the event
        const alreadyJoined = volunteers.some((volunteer: any) => volunteer.user_id === userId);
      
        setIsJoined(alreadyJoined);
        setEvent(eventData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndEvent();
  }, []);

  const handleJoinEvent = async () => {
    if (!event) return;

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found');
      }
      const volunteers = event.volunteers && Array.isArray(event.volunteers) ? event.volunteers : [];
      if (volunteers.some((volunteer: any) => volunteer.user_id === userId)) {
        setPopupMessage('You have already joined this event!');
        return;
      }

      const newVolunteer = {
        user_id: userId,
        status: 'Accepted',
      };

      const updatedEvent = {
        ...event,
        volunteers: [...volunteers, newVolunteer],
      };

      const { _id, ...updatePayload } = updatedEvent;

      const updateResponse = await axios.put(`http://localhost:5000/api/events/${event._id}`, updatePayload);

      const registration = {
        event_id: updatedEvent._id,
        user_id: userId,
        status: "Accepted",
        points_awarded: 0
      }
      console.log(registration);
      const addRegistrationResponse = await axios.post(`http://localhost:5000/api/registrations`, registration);

      if (updateResponse.status == 200 && addRegistrationResponse.status == 201) {
        setIsJoined(true);
        setPopupMessage('You have successfully joined the event!');
      } else {
        throw new Error('Failed to update event details');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleUploadTreePhoto = () => {
    router.push(`/uploadTreePhoto/?eventId=${eventId}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>No event details available.</div>;
  }

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '"Quicksand", sans-serif',
    paddingTop: '60px',
  };

  const boxStyle: React.CSSProperties = {
    backgroundColor: '#CBD2A4',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
    position: 'relative',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#54473F',
    marginBottom: '20px',
    marginTop: '50px',
  };

  const detailStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
  };

  const joinButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#FFFFFF',
    backgroundColor: isJoined ? '#A9A9A9' : '#54473F',
    border: 'none',
    borderRadius: '5px',
    cursor: isJoined ? 'not-allowed' : 'pointer',
    marginTop: '20px',
    alignSelf: 'center',
  };

  const uploadTreePhotoButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#FFFFFF',
    backgroundColor: '#54473F',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    alignSelf: 'center',
  };

  const backButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    padding: '5px 10px',
    fontSize: '16px',
    color: '#FFFFFF',
    backgroundColor: '#54473F',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: 10,
  };

  const popupStyle: React.CSSProperties = {
    marginTop: '10px',
    color: '#4CAF50',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle} className='event-details-page'>
      <div style={boxStyle}>
        <button style={backButtonStyle} onClick={handleBack}>Back</button>
        <h1 style={titleStyle}>{event.title}</h1>
        <p style={detailStyle}>{event.description}</p>
        <p style={detailStyle}>Location: {event.location?.address || 'No location available'}</p>
        <p style={detailStyle}>
          Date: {new Date(event.start_date).toLocaleDateString()} -{' '}
          {new Date(event.end_date).toLocaleDateString()}
        </p>

        <button
          style={joinButtonStyle}
          onClick={handleJoinEvent}
          disabled={isJoined}
        >
          {isJoined ? 'Already Joined' : 'Join Event'}
        </button>{' '}

        {
          isJoined &&
          <button style={uploadTreePhotoButtonStyle} onClick={handleUploadTreePhoto}>Upload Tree Photo</button>
        }

        {popupMessage && <div style={popupStyle}>{popupMessage}</div>}
      </div>
    </div>
  );
};

export default EventDetails;
