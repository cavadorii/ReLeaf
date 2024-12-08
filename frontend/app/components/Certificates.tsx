// src/components/Certificates.tsx
import React from 'react';
import '../styles/globals.css';


interface CertificatesProps {
  certificates: string[];
}

const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
  return (
    <div className="certificates">
      <h3>Earned Certificates</h3>
      {certificates.length ? (
        <ul>
          {certificates.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      ) : (
        <p>No certificates yet.</p>
      )}
    </div>
  );
};

export default Certificates;
