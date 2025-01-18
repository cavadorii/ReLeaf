// app/certificate/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';


interface Certificate {
  _id: string;
  userId: { name: string };
  eventId: { title: string };
  issued_at: string;
}

interface EventDetails{
  _id: string;
  title: string;
  location: {address: string};
  start_date: Date;
  end_date: Date;
}

const CertificatePage: React.FC = () => {
  const searchParams = useSearchParams();
  const certificateId = searchParams.get('id');

  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUserName] = useState<string|null>(null);
  const [eventDetails, setEventDetails] = useState<EventDetails|null>(null);

  useEffect(() => {
    if (!certificateId) {
      setError('No certificate ID provided in the URL.');
      setLoading(false);
      return;
    }

    const fetchCertificate = async () => {
      console.log(certificateId);
      try {
        const response = await axios.get(`http://localhost:5000/api/certificates/${certificateId}`);
        setCertificate(response.data);
        const user = await axios.get(`http://localhost:5000/api/users/${response.data.userId}`);
        setUserName(user.data.username);
        const event = await axios.get(`http://localhost:5000/api/events/${response.data.eventId}`);
        setEventDetails(event.data);
      } catch (err: any) {
        console.error('Error fetching certificate:', err);
        setError(err.response?.data?.message || 'Failed to load certificate.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
    console.log(certificate);
  }, [certificateId]);

  const handleDownload = async () => {
    if (!certificateId) return;

    setDownloadLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/certificates/${certificateId}/download`, {
        responseType: 'blob', // Ensure the response is treated as a file
      });

      // Create a URL for the blob and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Certificate_${certificateId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('Error downloading certificate:', err);
      alert(err.response?.data?.message || 'Failed to download the certificate. Please try again.');
    } finally {
      setDownloadLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p>Loading certificate...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <p style={styles.error}>{error}</p>
      </div>
    );
  }

  if (!certificate || !eventDetails) {
    return (
      <div style={styles.container}>
        <p>Certificate not found.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Certificate of Participation</h1>
        <p style={styles.text}>
          This certifies that <strong>{username}</strong> participated in the event 
          <strong> {eventDetails.title}</strong> between{' '}
            {format(new Date(eventDetails.start_date), 'PPpp')} and{' '}
            {format(new Date(eventDetails.end_date), 'PPpp')}.<br></br>
          Location: {eventDetails.location.address}.
        </p>
        <p style={styles.text}>Issued on: {new Date(certificate.issued_at).toLocaleDateString()}</p>

        <button
          onClick={handleDownload}
          disabled={loading}
          style={{
            ...styles.button,
            backgroundColor: loading ? '#a5a5a5' : '#789461',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Downloading...' : 'Download Certificate'}
        </button>
      </div>
    </div>
  );
};

// Inline styles for simplicity; consider using CSS modules or styled-components for larger projects
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    fontFamily: '"Quicksand", sans-serif',
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    maxWidth: '700px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    color: '#789461',
    marginBottom: '20px',
  },
  text: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#789461',
    color: '#FFFFFF',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  error: {
    color: 'red',
    fontSize: '18px',
  },
};

export default CertificatePage;