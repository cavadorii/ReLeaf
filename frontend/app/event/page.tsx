'use client'; // This marks the component as a client-side component

import React, { useEffect, useState } from 'react';

const Event: React.FC = () => {
  const [events, setEvents] = useState<Array<{ id: string; title: string; description: string; date: string }>>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 


  useEffect(() => {
    const fetchEvents = async () => {
      
        const response = await fetch('/api/events/getallevents'); 
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data); 
        setLoading(false);
    };

    fetchEvents();
  }, []);

  // Styles
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f4f7fa',
    padding: '20px',
    fontFamily: '"Quicksand", sans-serif',
    minHeight: '100vh',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '1200px',
  };

  const eventBoxStyle: React.CSSProperties = {
    backgroundColor: '#CBD2A4',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  };

  const eventTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#54473F',
    marginBottom: '10px',
  };

  const eventDescriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#555',
    marginBottom: '15px',
  };

  const eventDateStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#789461',
  };

  const headerBoxStyle: React.CSSProperties = {
    backgroundColor: '#CBD2A4',
    padding: '15px 30px',
    borderRadius: '10px',
    textAlign: 'center',
    marginBottom: '30px',
    fontFamily: '"Quicksand", sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#54473F',
    position: 'relative',
    zIndex: 1,
    top: '-50px',
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  // Render loading, error, or events grid
  return (
    <div style={containerStyle}>
      <div style={headerBoxStyle}>Upcoming Events</div>

      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div style={gridStyle}>
          {events.map((event) => (
            <div
              key={event.id}
              style={eventBoxStyle}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <h2 style={eventTitleStyle}>{event.title}</h2>
              <p style={eventDescriptionStyle}>{event.description}</p>
              <p style={eventDateStyle}>Date: {new Date(event.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Event;
