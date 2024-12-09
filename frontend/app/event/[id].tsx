'use client'; // This marks the component as a client-side component
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface EventProps {
  id: number;
  title: string;
  description: string;
  location: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  start_date: string;
  end_date: string;
}

const EventDetail: React.FC = () => {
  const [event, setEvent] = useState<EventProps | null>(null);
  const router = useRouter();
  const { id } = router.query; // Get the dynamic event ID from the URL

  useEffect(() => {
    // Mock data for event details (in real use case, fetch from a database)
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

    // Find event by ID
    const eventDetails = events.find((event) => event.id === parseInt(id as string));
    if (eventDetails) {
      setEvent(eventDetails);
    }
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: '"Quicksand", sans-serif' }}>
     
