'use client'; // This marks the component as a client-side component
import React from 'react';
import Link from 'next/link';

const Event: React.FC = () => {
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
    alignItems: 'center',
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

  const eventDateStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#789461',
    marginBottom: '5px',
  };

  const eventLocationStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#555',
  };

  const handleEventClick = (id: Number) => {
    localStorage.setItem('Id', id.toString());
  };

  const events = [
    {
      id: 1,
      title: 'Community Cleanup',
      location: {
        address: '123 Main St, Springfield',
      },
      start_date: '2024-11-15T09:00:00Z',
      end_date: '2024-11-15T12:00:00Z',
    },
    {
      id: 2,
      title: 'Food Drive',
      location: {
        address: '456 Elm St, Springfield',
      },
      start_date: '2024-11-20T10:00:00Z',
      end_date: '2024-11-20T14:00:00Z',
    },
    {
      id: 3,
      title: 'Tree Planting',
      location: {
        address: '789 Oak St, Springfield',
      },
      start_date: '2024-11-25T08:00:00Z',
      end_date: '2024-11-25T11:00:00Z',
    },
    
  ];

  return (
    <div style={containerStyle}>
      <div style={{ fontSize: '24px', marginBottom: '20px', color: '#54473F', fontWeight: 'bold' }}>
        Upcoming Events
      </div>
      <div style={gridStyle}>
        {events.map((event) => (
          <div key={event.id} style={eventBoxStyle}>
            <h2 style={eventTitleStyle}>{event.title}</h2>
            <p style={eventDateStyle}>
              Date: {new Date(event.start_date).toLocaleDateString()} -{' '}
              {new Date(event.end_date).toLocaleDateString()}
            </p>
            <p style={eventLocationStyle}>Location: {event.location.address}</p>
            <Link href={`/event/`} passHref>
              <button
                onClick={() => handleEventClick(event.id)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#54473F',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
