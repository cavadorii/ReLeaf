import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for missing Leaflet marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface EventLocation {
  _id: string;
  name: string; // Add the name field
  latitude: number;
  longitude: number;
}

interface EventMapComponentProps {
  eventLocations: EventLocation[];
}

const EventMapComponent: React.FC<EventMapComponentProps> = ({ eventLocations }) => {
  const ResizeMap = () => {
    const map = useMap();
    useEffect(() => {
      map.invalidateSize(); // Fix resizing issues
    }, [map]);
    return null;
  };

  return (
    <MapContainer
      center={[46.0, 25.0]} // Centered on a general location
      zoom={6}
      style={{ width: '100%', height: '100%' }}
    >
      <ResizeMap />
      <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
      {eventLocations.map((event) => (
        <Marker key={event._id} position={[event.latitude, event.longitude]}>
          <Popup>
            <strong>{event.name}</strong>
            <br />
            <a
              href={`/event?id=${event._id}`}
              style={{
                color: '#007BFF',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              View Details
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default EventMapComponent;
