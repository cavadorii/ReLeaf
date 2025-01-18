'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import '../styles/globals.css';

const EventMapComponent = dynamic(() => import('../components/EventMapComponent'), {
  ssr: false,
});

const AssociationSearch: React.FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<any | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const eventsPerPage = 4;

  const searchBoxStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(/brazi.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '400px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    color: '#333',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#FFFFFF',
    backgroundColor: '#54473F',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f4f7fa',
    padding: '20px',
    fontFamily: '"Quicksand", sans-serif',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #B1C29E, #659287)',
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '24px',
    marginBottom: '40px',
    color: '#54473F',
    fontWeight: 'bold',
  };

  const cardListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '600px',
  };

  const eventCardStyle: React.CSSProperties = {
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

  const eventDetailStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#555',
    marginBottom: '10px',
  };

  const paginationStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    gap: '10px',
  };

  const arrowButtonStyle: React.CSSProperties = {
    padding: '10px 15px',
    backgroundColor: '#54473F',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const fetchEvents = async (associationId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/events/association/${associationId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch events for the association.');
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Error fetching events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      if (!name.trim()) {
        setError('Please enter a valid association name.');
        setResult(null);
        return;
      }
      setError('');
      setLoading(true);

      const response = await fetch(`http://localhost:5000/api/associations?name=${name}`);
      if (!response.ok) {
        throw new Error('Association not found');
      }

      const data = await response.json();
      console.log('Association ID:', data._id);
      setResult(data);

      await fetchEvents(data._id);
    } catch (err) {
      console.error('Error fetching association:', err);
      setError('Error fetching association. Please try again.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const paginate = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < Math.ceil(events.length / eventsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div style={containerStyle}>
      {!result ? (
        <>
          <div style={headerStyle}>Search for an Association</div>
          <div style={searchBoxStyle}>
            <input
              type="text"
              placeholder="Enter association name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
            <button onClick={handleSearch} style={buttonStyle} disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          </div>
        </>
      ) : (
        <>
          <div style={headerStyle}>{result.name} Events</div>
          <div style={styles.mapContainer}>
            <EventMapComponent
              eventLocations={events
                .filter((event) => event.location?.coordinates)
                .map((event) => ({
                  _id: event._id,
                  name: event.title,
                  latitude: event.location.coordinates.latitude,
                  longitude: event.location.coordinates.longitude,
                }))}
            />
          </div>
          {/* Create Event Button */}
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <Link href={`/eventCreate?association=${result._id}`} passHref>
              <button style={buttonStyle}>Create Event</button>
            </Link>
          </div>
          <div style={headerStyle}>Event List</div>
          {events.length > 0 ? (
            <div style={cardListStyle}>
              {currentEvents.map((event) => (
                <div key={event._id} style={eventCardStyle}>
                  <h2 style={eventTitleStyle}>{event.title}</h2>
                  <p style={eventDetailStyle}>
                    Date: {new Date(event.start_date).toLocaleDateString()} -{' '}
                    {new Date(event.end_date).toLocaleDateString()}
                  </p>
                  <p style={eventDetailStyle}>
                    Location: {event.location?.address || 'Unknown'}
                  </p>
                  <Link href={`/event?id=${event._id}`} passHref>
                    <button style={buttonStyle}>View Details</button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#54473F' }}>No events found for this association.</p>
          )}
          <div style={paginationStyle}>
            <button
              style={arrowButtonStyle}
              onClick={() => paginate('prev')}
              disabled={currentPage === 1}
            >
              &lt; Prev
            </button>
            <button
              style={arrowButtonStyle}
              onClick={() => paginate('next')}
              disabled={currentPage === Math.ceil(events.length / eventsPerPage)}
            >
              Next &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AssociationSearch;

const styles = {
  mapContainer: {
    width: '100%',
    maxWidth: '800px',
    height: '400px',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    marginBottom: '20px',
  },
};
