'use client'; // Mark as a client-side component
import React, { useEffect, useState } from 'react';

const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const currentId = localStorage.getItem('Id');
      if (!currentId) {
        setError('Event ID not found.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/events/${currentId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setEvent(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

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
      </div>
    </div>
  );
};

export default EventDetails;
