'use client'; // This marks the component as a client-side component
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Event: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const eventsPerPage = 4;

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

  const headerStyle: React.CSSProperties = {
    fontSize: '24px',
    marginBottom: '100px',
    color: '#54473F',
    fontWeight: 'bold',
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

  const handleEventClick = (id: string) => {
    localStorage.setItem('Id', id);
  };

  const paginate = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < Math.ceil(events.length / eventsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div style={containerStyle}>Loading events...</div>;
  }

  if (error) {
    return <div style={containerStyle}>Error: {error}</div>;
  }

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>Upcoming Events</div>
      <div style={gridStyle}>
        {currentEvents.map((event) => (
          <div key={event._id} style={eventBoxStyle}>
            <h2 style={eventTitleStyle}>{event.title}</h2>
            <p style={eventDateStyle}>
              Date: {new Date(event.start_date).toLocaleDateString()} -{' '}
              {new Date(event.end_date).toLocaleDateString()}
            </p>
            <p style={eventLocationStyle}>Location: {event.location?.address || 'Unknown'}</p>
            <Link href={`/event/`} passHref>
              <button
                onClick={() => handleEventClick(event._id)}
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
    </div>
  );
};

export default Event;
