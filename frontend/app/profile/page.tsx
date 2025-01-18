'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import '../styles/globals.css';

const AssociationSearch: React.FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<any | null>(null); // To store search results

  const handleSearch = async () => {
    try {
      if (!name.trim()) {
        setError('Please enter a valid association name.');
        setResult(null);
        return;
      }
      setError('');

      const response = await fetch(`http://localhost:5000/api/associations?name=${name}`);
      if (!response.ok) {
        throw new Error('Association not found');
      }

      const data = await response.json();
      console.log('Association ID:', data._id); // Log association ID
      setResult(data);
    } catch (err) {
      console.error('Error fetching association:', err);
      setError('Error fetching association. Please try again.');
      setResult(null);
    }
  };

  return (
    <div className="profile-page">
      <div className="user-info">
        <h1>Search for an Association</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter association name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}

        {/* Display Result */}
        {result && (
          <div className="search-result">
            <h3>Association Found:</h3>
            <p>ID: {result._id}</p>
            <p>Name: {result.name}</p>
            <p>Description: {result.description}</p>
            <Link href={`/association/${result._id}`} passHref>
              <button className="view-details-button">View Details</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssociationSearch;
