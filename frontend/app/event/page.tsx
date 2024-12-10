'use client'; // Mark as a client-side component
import React, { useEffect, useState } from 'react';

const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVolunteer, setIsVolunteer] = useState<boolean>(false);
  const [isJoined, setIsJoined] = useState<boolean>(false); // Track if the user has joined the event
  const [popupMessage, setPopupMessage] = useState<string | null>(null); // For popup message

  useEffect(() => {
    const fetchUserAndEvent = async () => {
      const userId = localStorage.getItem('userId'); // Get the user ID from local storage
      const eventId = localStorage.getItem('Id'); // Get the event ID from local storage
  
      if (!userId || !eventId) {
        setError('User or Event ID not found.');
        setLoading(false);
        return;
      }
  
      try {
        setLoading(true);
        // Fetch user details from the backend
        const userResponse = await fetch(`http://localhost:5000/api/users/${userId}`);
        if (!userResponse.ok) {
          throw new Error('User not found');
        }
        const userData = await userResponse.json();
        console.log('User Data:', userData);  // Add log here
        if (userData.role === 'volunteer') {
          setIsVolunteer(true); // If user is a volunteer, show the button
        }
  
        // Fetch event details from the backend
        const eventResponse = await fetch(`http://localhost:5000/api/events/${eventId}`);
        if (!eventResponse.ok) {
          throw new Error('Error fetching event details');
        }
        const eventData = await eventResponse.json();
        setEvent(eventData);
        console.log('Event Data:', eventData);  // Add log here
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
      // Get userId from localStorage
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found');
      }
  
      // Check if user is already in the volunteer list
      if (event.volunteers.some((volunteer: any) => volunteer.user_id === userId)) {
        setPopupMessage('You have already joined this event!');
        return;
      }
  
      // Add the user with status "pending"
      const newVolunteer = {
        user_id: userId,
        status: 'pending', // Default status
      };
  
      // Update the event's volunteers list with the new volunteer
      const updatedEvent = {
        ...event,
        volunteers: [...event.volunteers, newVolunteer], // Add new volunteer to the list
      };
  
      // Send the updated event data to the backend
      const updateResponse = await fetch(`http://localhost:5000/api/events/${event._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent), // Send the updated event with the new volunteers list
      });
  
      if (updateResponse.ok) {
        setIsJoined(true); // Update UI to show user has joined
        setPopupMessage('You have successfully joined the event!');
      } else {
        throw new Error('Failed to update event details');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

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
    backgroundColor: '#FFFFFF', // Overall background
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '"Quicksand", sans-serif',
  };

  const boxStyle: React.CSSProperties = {
    backgroundColor: '#CBD2A4', // Box background color
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#54473F',
    marginBottom: '20px',
  };

  const detailStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 style={titleStyle}>{event.title}</h1>
        <p style={detailStyle}>{event.description}</p>
        <p style={detailStyle}>Location: {event.location?.address || 'No location available'}</p>
        <p style={detailStyle}>
          Date: {new Date(event.start_date).toLocaleDateString()} -{' '}
          {new Date(event.end_date).toLocaleDateString()}
        </p>

        {/* Show the "Join Event" button only if the user is a volunteer */}
        {isVolunteer && !isJoined && (
          <button onClick={handleJoinEvent}>Join Event</button>
        )}

        {/* Popup message after joining */}
        {popupMessage && <div>{popupMessage}</div>}
      </div>
    </div>
  );
};

export default EventDetails;
