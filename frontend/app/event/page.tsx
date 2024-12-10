'use client'; // Mark as a client-side component
import React, { useEffect, useState } from 'react';

const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<any | null>(null);

  useEffect(() => {
    const currentId = localStorage.getItem('Id');
    const id = Number(currentId); // Convert ID to a number

    // Mock events data (this should be replaced with real data fetching in a real app)
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

    // Find the event by ID and update state
    if (id) {
      const selectedEvent = events.find((event) => event.id === id);
      setEvent(selectedEvent);
    }
  }, []); // Add empty dependency array to run only once

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: '"Quicksand", sans-serif', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', color: '#54473F' }}>{event.title}</h1>
      <p style={{ fontSize: '16px', color: '#555' }}>{event.description}</p>
      <p style={{ fontSize: '14px', color: '#789461' }}>
        Location: {event.location.address}
      </p>
      <p style={{ fontSize: '14px', color: '#789461' }}>
        Date: {new Date(event.start_date).toLocaleDateString()} -{' '}
        {new Date(event.end_date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default EventDetails;
