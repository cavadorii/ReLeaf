'use client'; // This marks the component as a client-side component

import React from 'react';
import Image from 'next/image';
//import Head from 'next/head'; // Import the Head component

const Login: React.FC = () => {
  // Global container style
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f7fa',
    padding: '20px',
    fontFamily: '"Quicksand", sans-serif', // Apply Quicksand font
  };

  // Login box style
  const loginBoxStyle: React.CSSProperties = {
    backgroundColor: '#CBD2A4',
    borderRadius: '10px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    textAlign: 'center',
    fontFamily: '"Quicksand", sans-serif', // Apply Quicksand font
  };

  const logoStyle: React.CSSProperties = {
    marginBottom: '30px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const inputContainerStyle: React.CSSProperties = {
    marginBottom: '20px',
    textAlign: 'left',
    color: '#789461',
    fontFamily: '"Quicksand", sans-serif', // Apply Quicksand font
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#555',
    marginBottom: '8px',
    display: 'block',
    fontFamily: '"Quicksand", sans-serif', // Apply Quicksand font
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    fontSize: '16px',
    color: '#333',
    transition: 'all 0.3s ease',
    fontFamily: '"Quicksand", sans-serif', // Apply Quicksand font
  };

  const forgotPasswordStyle: React.CSSProperties = {
    display: 'block',
    marginTop: '10px',
    color: '#54473F',
    textDecoration: 'none',
    fontSize: '14px',
    fontFamily: '"Quicksand", sans-serif', // Apply Quicksand font
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#789461',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontFamily: '"Quicksand", sans-serif', // Apply Quicksand font
  };

  const registerLinkStyle: React.CSSProperties = {
    marginTop: '20px',
    fontSize: '14px',
    color: '#54473F',
    fontFamily: '"Quicksand", sans-serif', // Apply Quicksand font
  };

  const registerLinkAnchorStyle: React.CSSProperties = {
    color: '#914F1E',
    textDecoration: 'none',
    fontFamily: '"Quicksand", sans-serif', // Apply Quicksand font
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#EDDD9F';
    e.target.style.backgroundColor = '#e9f5ff';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#ddd';
    e.target.style.backgroundColor = '#f8f9fa';
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#50623A';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#789461';
  };

  const handleRegisterLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.textDecoration = 'underline';
  };

  const handleRegisterLinkOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.textDecoration = 'none';
  };

  return (

    <>


      <div style={containerStyle}>
        <div style={loginBoxStyle}>
          <div className="logo">
            <Image
              src="/logo.png"
              alt="Logo"
              width={75}
              height={75}
              style={logoStyle}
            />
          </div>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <a href="#" style={forgotPasswordStyle}>
            Forgot Password?
          </a>
          <button
            style={buttonStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Login
          </button>
          <div style={registerLinkStyle}>
            Don’t have an account?{' '}
            <a
              href="#"
              style={registerLinkAnchorStyle}
              onMouseOver={handleRegisterLinkHover}
              onMouseOut={handleRegisterLinkOut}
            >
              Register here
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
