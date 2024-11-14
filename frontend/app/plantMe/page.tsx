// app/plantMe/page.tsx

'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import MapComponent with SSR disabled
const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
});

const PlantMePage: React.FC = () => {
  const styles = {
    page: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      backgroundColor: '#d1d1b9',
      height: '100vh',
      padding: '10px',
      boxSizing: 'border-box' as const,
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#4a5b3e',
      marginBottom: '10px',
    },
    contributeButton: {
      width: '90%',
      padding: '10px',
      fontSize: '18px',
      color: 'white',
      backgroundColor: '#74c67a',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      marginBottom: '20px',
      marginTop: 'auto',
    },
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Plant Me</h2>

      {/* Map Component */}
      <MapComponent />

      <button style={styles.contributeButton}>Contribute</button>
    </div>
  );
};

export default PlantMePage;
