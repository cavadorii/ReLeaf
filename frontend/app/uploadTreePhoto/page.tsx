'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Modal from 'react-modal';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

interface Location {
  latitude: number;
  longitude: number;
}

const MapClickHandler: React.FC<{ setLocation: (location: Location) => void; closeModal: () => void }> = ({
  setLocation,
  closeModal,
}) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocation({ latitude: lat, longitude: lng });
      closeModal();
    },
  });
  return null;
};

const UploadTreePhoto: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoName, setPhotoName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // User ID from localStorage
  const [eventTitle, setEventTitle] = useState<string>('');
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');

  const router = useRouter();

  // Get the user ID from localStorage when the component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error('User ID not found in localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchEventInformation = async () => {
      try {
        setPageLoading(true);
        const eventResponse = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        if (!(eventResponse.status == 200)) {
          throw new Error('Error fetching event details');
        }
        const eventData = eventResponse.data;
        setEventTitle(eventData.title);
        setLocation({
          latitude: eventData.location.coordinates.latitude,
          longitude: eventData.location.coordinates.longitude,
        });
      }
      catch (err: any) {
        console.error(err.message);
      }
      finally {
        setPageLoading(false);
      }
    };

    fetchEventInformation();
  }, []);

  // Automatically get user's current location
  useEffect(() => {
    if (eventId) {
        return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (location && photo && photoName && userId && eventId) {
      setLoading(true);
      const formData = new FormData();
      formData.append('photo', photo); // Attach the file with field name 'photo'
      formData.append('photoName', photoName); // Add photo name
      formData.append('latitude', location.latitude.toString()); // Add latitude
      formData.append('longitude', location.longitude.toString()); // Add longitude
      formData.append('registration_id', 'sample_registration_id'); // Replace with actual data
      formData.append('user_id', userId); // Include userId from localStorage
      formData.append('event_id', eventId); // Replace with actual data
  
      try {
        // Send the FormData to /api/tree-photos/ endpoint
        const response = await fetch('http://localhost:5000/api/tree-photos/', {
          method: 'POST',
          body: formData, // Pass FormData directly
        });
  
        if (response.ok) {
          alert('Photo metadata saved successfully.');
          router.push('/plantMe');
        } else {
          const errorData = await response.json();
          console.error('Error:', errorData);
          alert('Failed to save photo metadata to database.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing the request.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill out all fields.');
    }
  };
  
  if (pageLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: '"Quicksand", sans-serif',
        backgroundImage: 'url("/forest.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#CBD2A4',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '500px',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#789461', marginBottom: '20px' }}>Upload Tree Photo</h2>
        {
          eventId != null &&
          <h2 style={{ color: '#789461', marginBottom: '20px' }}>Contribute to: {eventTitle}</h2>
        }
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px', textAlign: 'left', color: '#789461' }}>
            <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Photo Name</label>
            <input
              type="text"
              placeholder="Enter photo name"
              value={photoName}
              onChange={(e) => setPhotoName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                backgroundColor: '#fff',
                fontSize: '16px',
                color: '#333',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px', textAlign: 'left', color: '#789461' }}>
            <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                backgroundColor: '#fff',
                fontSize: '16px',
                color: '#333',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px', color: '#789461' }}>
            <p>
              <strong>Location:</strong>{' '}
              {location
                ? `Latitude: ${location.latitude}, Longitude: ${location.longitude}`
                : 'Getting location...'}
            </p>
            {
              eventId == null &&
              <button
                type="button"
                onClick={() => setIsMapOpen(true)}
                style={{
                  width: '50%',
                  padding: '10px',
                  backgroundColor: '#789461',
                  color: '#fff',
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Select Location
              </button>
            }
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#789461',
              color: '#fff',
              fontSize: '16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </form>
      </div>

      {/* Map Modal */}
      <Modal
  isOpen={isMapOpen}
  onRequestClose={() => setIsMapOpen(false)}
  style={{
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '800px',
      height: '500px',
      borderRadius: '15px',
      padding: '0',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    },
  }}
>
  <MapContainer
    center={[46.0, 25.0]} // Centered on Romania
    zoom={7} // Suitable zoom level for Romania
    style={{ height: '100%', width: '100%' }}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Neutral map style from CartoDB
    />
    <MapClickHandler setLocation={setLocation} closeModal={() => setIsMapOpen(false)} />
    {location && (
      <Marker position={[location.latitude, location.longitude]} />
    )}
  </MapContainer>
</Modal>

    </div>
  );
};

export default UploadTreePhoto;
