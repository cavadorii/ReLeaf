"use client";

import React from 'react';
import Image from 'next/image';

const PlantMePage: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '20px',
      fontFamily: '"Quicksand", sans-serif',
      backgroundColor: '#d1d1b9',
      backgroundImage: 'url("/forest.jpg")',  
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div style={{
        backgroundColor: '#CBD2A4',
        borderRadius: '10px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '600px', 
        padding: '40px',
        textAlign: 'center',
        margin: '0 auto', 
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#4a5b3e',
          marginBottom: '10px',
        }}>
          Plant Me
        </h2>

        {/* map placeholder */ }
        <div style={{
          width: '100%',
          height: '50vh',
          borderRadius: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden', // Ensures the image fits within the rounded borders
          marginBottom: '20px',
          position: 'relative',
        }}>
          <Image
            src="/map-photo.png"  // Replace with the path to your image
            alt="Map placeholder"
            layout="responsive"    // Makes the image responsive to the container's width
            width={600}            // Adjust width to match container width
            height={400}           // Adjust height for better aspect ratio
            style={{
              borderRadius: '15px', // Ensures the image has rounded corners matching the div
              objectFit: 'cover',   // Ensures the image covers the div
            }}
          />
        </div>

        <button style={{
          width: '100%',
          padding: '14px',
          fontSize: '18px',
          color: 'white',
          backgroundColor: '#54473F',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontFamily: '"Quicksand", sans-serif',
          marginBottom: '20px',
        }}>
          Contribute
        </button>
      </div>
    </div>
  );
};

export default PlantMePage;
