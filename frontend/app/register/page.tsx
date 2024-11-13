"use client";
import React, { useState } from 'react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle form submission logic here
    console.log('Form data submitted: ', formData);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#e0e0e0',
      padding: '20px' 
    }}>
      <div style={{
        backgroundColor: '#ffffff', 
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%',
      }}>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#c3c69a', 
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ color: '#000', textAlign: 'center' }}>Create New Account</h2>

          <label style={{ color: '#333', display: 'block', marginTop: '10px' }}>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Ex: Mihnea Bucur"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#f0e6c9',
              color: '#333',
            }}
            aria-label="Full Name"
          />

          <label style={{ color: '#333', display: 'block', marginTop: '10px' }}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="user@mail.com"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#f0e6c9',
              color: '#333',
            }}
            aria-label="Email Address"
          />

          <label style={{ color: '#333', display: 'block', marginTop: '10px' }}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="+40 99887 76655"
            value={formData.phone}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#f0e6c9',
              color: '#333',
            }}
            aria-label="Phone Number"
          />

          <label style={{ color: '#333', display: 'block', marginTop: '10px' }}>Password</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: 'calc(100% - 40px)',
                padding: '10px',
                marginTop: '5px',
                borderRadius: '5px 0 0 5px',
                border: 'none',
                backgroundColor: '#f0e6c9',
                color: '#333',
              }}
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#f0e6c9',
                border: 'none',
                marginTop: '5px',
                borderRadius: '0 5px 5px 0',
                cursor: 'pointer',
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <label style={{ color: '#333', display: 'block', marginTop: '10px' }}>Confirm Password</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                width: 'calc(100% - 40px)',
                padding: '10px',
                marginTop: '5px',
                borderRadius: '5px 0 0 5px',
                border: 'none',
                backgroundColor: '#f0e6c9',
                color: '#333',
              }}
              aria-label="Confirm Password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#f0e6c9',
                border: 'none',
                marginTop: '5px',
                borderRadius: '0 5px 5px 0',
                cursor: 'pointer',
              }}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            type="submit"
            style={{
              marginTop: '20px',
              width: '100%',
              padding: '10px',
              backgroundColor: '#526E48',
              border: 'none',
              borderRadius: '20px',
              color: '#000',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Register
          </button>

          <p style={{ textAlign: 'center', marginTop: '10px', color: '#333' }}>
            Already have an account? <a href="/login" style={{ color: '#000', fontWeight: 'bold' }}>Login Now</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
