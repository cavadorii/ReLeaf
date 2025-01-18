'use client'; // Mark as a client-side component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// A custom hook to handle map events (e.g., location selection)
const LocationPicker: React.FC<{ setLocation: (latLng: LatLng) => void }> = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation(e.latlng); // Update location on map click
    },
  });

  return null;
};

const EventCreate: React.FC = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: { address: '', coordinates: { latitude: 0, longitude: 0 } },
    start_date: '',
    end_date: '',
    association_id: '', // Add association_id to the eventData state
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams(); // Get URL query parameters

  // Extract association_id from the URL query
  useEffect(() => {
    const associationId = searchParams.get('association');
    if (associationId) {
      setEventData((prev) => ({ ...prev, association_id: associationId }));
    } else {
      setError('Association ID is missing from the URL.');
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Handle address and location state separately
    if (name === 'address') {
      setEventData({
        ...eventData,
        location: {
          ...eventData.location,
          address: value, // Update only the address field
        },
      });
    } else {
      setEventData({
        ...eventData,
        [name]: value,
      });
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/events', eventData);
      if (response.status === 201) {
        setLoading(false);
        router.push('/events'); // Redirect to events list after creating the event
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };

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
    color: '#333333',
    marginBottom: '10px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    color: '#888',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#FFFFFF',
    backgroundColor: '#54473F',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
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

  return (
    <div style={containerStyle} className="event-create-page">
      <div style={boxStyle}>
        <button style={backButtonStyle} onClick={() => router.back()}>Back</button>
        <h1 style={titleStyle}>Create Event</h1>

        <form onSubmit={handleCreateEvent}>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            placeholder="Event Title"
            style={inputStyle}
          />
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Event Description"
            style={inputStyle}
          />

          {/* Display the map picker for location */}
          <label htmlFor="location" style={detailStyle}>Select Location</label>
          <MapContainer
            center={[45.9432, 24.9668]} // Center on Romania
            zoom={6} // Adjust zoom level to show a larger area
            style={{ width: '100%', height: '300px', marginBottom: '15px' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationPicker setLocation={(latLng) => setEventData({
              ...eventData,
              location: {
                address: eventData.location.address, // Preserve address
                coordinates: { latitude: latLng.lat, longitude: latLng.lng }
              }
            })} />
            <Marker position={[eventData.location.coordinates.latitude, eventData.location.coordinates.longitude]}>
              <Popup>Event Location</Popup>
            </Marker>
          </MapContainer>

          <label htmlFor="address" style={detailStyle}>Address</label>
          <input
            type="text"
            name="address"
            value={eventData.location.address}
            onChange={handleChange}
            placeholder="Event Address"
            style={inputStyle}
          />
          {/* Displaying coordinates */}
          <input
            type="text"
            name="latitude"
            value={eventData.location.coordinates.latitude}
            readOnly
            style={inputStyle}
            placeholder="Latitude"
          />
          <input
            type="text"
            name="longitude"
            value={eventData.location.coordinates.longitude}
            readOnly
            style={inputStyle}
            placeholder="Longitude"
          />

          <label htmlFor="start_date" style={detailStyle}>Start Date</label>
          <input
            type="date"
            name="start_date"
            value={eventData.start_date}
            onChange={handleChange}
            style={inputStyle}
          />

          <label htmlFor="end_date" style={detailStyle}>End Date</label>
          <input
            type="date"
            name="end_date"
            value={eventData.end_date}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? 'Creating Event...' : 'Create Event'}
          </button>
        </form>

        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      </div>
    </div>
  );
};

export default EventCreate;
