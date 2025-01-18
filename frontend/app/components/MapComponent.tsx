// components/MapComponent.tsx
import React from 'react';
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

interface TreePhoto {
  _id: string;
  latitude: number;
  longitude: number;
}

interface MapComponentProps {
  treeLocations: TreePhoto[];
}

const MapComponent: React.FC<MapComponentProps> = ({ treeLocations }) => {
  return (
    <MapContainer
      center={[46.0, 25.0]} // Centered on Romania and surrounding area
      zoom={6} // Suitable zoom level
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {treeLocations.map((tree) => (
        <Marker key={tree._id} position={[tree.latitude, tree.longitude]}>
          <Popup>
            Tree Location <br />
            Latitude: {tree.latitude.toFixed(5)} <br />
            Longitude: {tree.longitude.toFixed(5)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
