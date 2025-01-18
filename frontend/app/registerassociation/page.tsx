"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterAssociation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Retrieve userId from localStorage
      const userId = localStorage.getItem("userId");
  
      // Check if userId exists
      if (!userId) {
        alert("User is not logged in. Please log in to register an association.");
        return;
      }
  
      // Send the data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/associations",
        {
          user_id: userId, // Include the userId from localStorage
          name: formData.name,
          description: formData.description,
        }
      );
  
      if (response.status === 201) {
        alert("Association registered successfully!");
        router.push("/plantMe"); // Redirect to plantME ### CHANGE ###
      }
    } catch (error: any) {
      console.error("Error response:", error.response?.data || error.message);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f7fa",
        backgroundImage: 'url("/forest.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        fontFamily: '"Quicksand", sans-serif',
        margin: 0,
      }}
    >
      <div
        style={{
          backgroundColor: "#CBD2A4",
          borderRadius: "10px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            color: "#333",
            fontSize: "24px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          Register Association
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              style={{
                fontSize: "14px",
                color: "#555",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter association name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                fontSize: "16px",
                fontFamily: '"Quicksand", sans-serif',
                color: "#000",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              style={{
                fontSize: "14px",
                color: "#555",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Enter association description"
              value={formData.description}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                fontSize: "16px",
                fontFamily: '"Quicksand", sans-serif',
                color: "#000"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#789461",
              color: "#fff",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: '"Quicksand", sans-serif',
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              transition: "background-color 0.3s, transform 0.3s",
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAssociation;
