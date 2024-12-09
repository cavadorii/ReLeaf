'use client'; // This marks the component as a client-side component
import React from 'react';
import Link from 'next/link';

const Event: React.FC = () => {
  // Page container style
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

  // Events grid style
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '1200px',
  };

  // Individual event box style
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

  // Upcoming events header box style
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

  // Mock data for events
  const events = [
    {
      id: 1,
      title: 'Community Cleanup',
      description: 'Join us for a community cleanup event to make the neighborhood cleaner!',
      location: {
        address: '123 Main St, Springfield',
        coordinates: { latitude: 40.7128, longitude: -74.0060 },
      },
      start_date: '2024-11-15T09:00:00Z',
      end_date: '2024-11-15T12:00:00Z',
    },
    {
      id: 2,
      title: 'Food Drive',
      description: 'Help us collect food donations for local shelters.',
      location: {
        address: '456 Elm St, Springfield',
        coordinates: { latitude: 40.7138, longitude: -74.0059 },
      },
      start_date: '2024-11-20T10:00:00Z',
      end_date: '2024-11-20T14:00:00Z',
    },
    {
      id: 3,
      title: 'Tree Planting',
      description: 'Join us to plant trees and help the environment.',
      location: {
        address: '789 Oak St, Springfield',
        coordinates: { latitude: 40.7148, longitude: -74.0048 },
      },
      start_date: '2024-11-25T08:00:00Z',
      end_date: '2024-11-25T11:00:00Z',
    },
  ];

  return (
    <div style={containerStyle}>
      <div style={headerBoxStyle}>Upcoming Events</div>
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
            <p style={eventDateStyle}>
              Date: {new Date(event.start_date).toLocaleDateString()} -{' '}
              {new Date(event.end_date).toLocaleDateString()}
            </p>
            <Link href={`/event/${event.id}`} passHref>
              <button style={{ padding: '10px 20px', backgroundColor: '#54473F', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Show Description
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
