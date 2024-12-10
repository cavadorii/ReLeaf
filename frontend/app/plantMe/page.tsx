'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

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
      background: 'linear-gradient(to bottom, #789461, #CBD2A4)',
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box' as const,
      color: '#ffffff',
      fontFamily: '"Quicksand", sans-serif',
    },
    titleContainer: {
      textAlign: 'center' as const,
      marginBottom: '20px',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#E4E8E1',
      marginBottom: '30px',
    },
    contributeButton: {
      padding: '14px 20px',
            fontSize: '18px',
            color: 'white',
            backgroundColor: '#789461',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: '"Quicksand", sans-serif',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s, transform 0.3s',
            marginTop: '20px',
    },
    mapContainer: {
      width: '100%',
      maxWidth: '800px',
      height: '60%',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      marginBottom: '20px',
    },
    buttonHover: {
      backgroundColor: '#45A049',
      transform: 'scale(1.05)',
    },
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Plant Me</h2>

      <div>
      <p style={styles.subtitle}>Discover locations and contribute to the environment by planting trees!</p>
      </div>
      {/* Map Component */}
      <MapComponent />

      <Link href="/uploadTreePhoto">
        <button
          style={styles.contributeButton}
        >
          Contribute
        </button>
      </Link>
    </div>
  );
};

export default PlantMePage;
