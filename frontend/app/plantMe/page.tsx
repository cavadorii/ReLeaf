'use client'

import React from 'react';

const PlantMePage: React.FC = () => {
  // Define styles as JavaScript objects with 'as const' for literal types
  const styles = {
    page: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#d1d1b9', // Light greenish background
      height: '100vh',
      padding: '10px',
      boxSizing: 'border-box', // TypeScript will now infer this as the literal 'border-box'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#4a5b3e', // Dark green text
      marginBottom: '10px',
    },
    mapPlaceholder: {
      width: '90%',
      height: '50vh',
      backgroundColor: '#c4c4a3', // Light background color for map area
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4a5b3e',
      fontSize: '18px',
      marginBottom: '20px',
    },
    contributeButton: {
      width: '90%',
      padding: '10px',
      fontSize: '18px',
      color: 'white',
      backgroundColor: '#74c67a', // Green color for the button
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      marginBottom: '20px',
    },

  } as const; // Use 'as const' here

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Plant Me</h2>

      {/* Placeholder for the map */}
      <div style={styles.mapPlaceholder}>Map Area</div>

      <button style={styles.contributeButton}>Contribute</button>
    </div>
  );
};

export default PlantMePage;
