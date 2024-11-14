// components/MapComponent.tsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for marker icons not displaying correctly

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface TreeLocation {
  id: number;
  position: [number, number];
  name: string;
}

// Hardcoded tree locations
const treeLocations: TreeLocation[] = [
  { id: 1, position: [50.85045, 4.34878], name: 'Tree in Brussels' },
  { id: 2, position: [51.5074, -0.1278], name: 'Tree in London' },
  { id: 3, position: [48.8566, 2.3522], name: 'Tree in Paris' },
];

const MapComponent: React.FC = () => {
  // State to ensure the map is only rendered on the client
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this only runs on the client
  }, []);

  // Only render the map on the client-side
  if (!isClient) return null;

  return (
    <MapContainer center={[51.505, -0.09]} zoom={5} style={{ width: '100%', height: '50vh', borderRadius: '15px' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {treeLocations.map((tree) => (
        <Marker key={tree.id} position={tree.position}>
          <Popup>{tree.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
