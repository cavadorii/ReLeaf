"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const EventFeedback: React.FC = () => {
    const [formData, setFormData] = useState({
        event_id: 0,
        volunteer_id: 0,
        rating: 0,
        comment: '',
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

        if (formData.rating < 1 || formData.rating > 5)
        {
            alert("Rating must be between 1 and 5!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/feedback', {
                event_id: Number(formData.event_id),
                volunteer_id: Number(formData.volunteer_id),
                rating: Number(formData.rating),
                comment: formData.comment
            });

            if (response.status === 201) {
                alert("Feedback added succesfully");
                router.push('/event');
            }
        } catch (error) {
            console.error("Could not add the event: ", error);
            alert("Error creating event feedback. Please try again.");
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', 
            backgroundColor: '#f4f7fa', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            padding: '20px',
            fontFamily: '"Quicksand", sans-serif',
            margin: 0,
        }}>

            <div style = {{
                backgroundColor: '#CBD2A4',
                borderRadius: '10px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                width: '100%',
                height: '105%',
                maxWidth: '400px',
                padding: '30px',
                textAlign: 'center',
                overflow: 'hidden', 
                boxSizing: 'border-box', 
                margin: '20px',
            }}>
                
                <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>Provide Feedback</h2>
            
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px', textAlign: 'left', color: '#789461' }}>
                        <label style={{ fontSize: '14px', color: '#555', marginBottom: '8px', display: 'block' }}>Event ID</label>
                        <input
                            type='number'
                            name='event_id'
                            placeholder='Event ID'
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                backgroundColor: '#fff',
                                fontSize: '16px',
                                color: '#333',
                                fontFamily: '"Quicksand", sans-serif',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '10px', textAlign: 'left', color: '#789461' }}>
                        <label style={{ fontSize: '14px', color: '#555', marginBottom: '8px', display: 'block' }}>Volunteer ID</label>
                        <input
                            type='number'
                            name='volunteer_id'
                            placeholder='Volunteer ID'
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                backgroundColor: '#fff',
                                fontSize: '16px',
                                color: '#333',
                                fontFamily: '"Quicksand", sans-serif',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '10px', textAlign: 'left', color: '#789461' }}>
                        <label style={{ fontSize: '14px', color: '#555', marginBottom: '8px', display: 'block' }}>Rating</label>
                        <input
                            type='number'
                            name='rating'
                            placeholder='Rating (1 to 5)'
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                backgroundColor: '#fff',
                                fontSize: '16px',
                                color: '#333',
                                fontFamily: '"Quicksand", sans-serif',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '10px', textAlign: 'left', color: '#789461' }}>
                        <label style={{ fontSize: '14px', color: '#555', marginBottom: '8px', display: 'block' }}>Comment</label>
                        <input
                            type='text'
                            name='comment'
                            placeholder='Comment'
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                backgroundColor: '#fff',
                                fontSize: '16px',
                                color: '#333',
                                fontFamily: '"Quicksand", sans-serif',
                            }}
                        />
                    </div>

                    <div style={{ marginTop: '20px', textAlign: 'left', color: '#789461' }}>
                        <button
                            type='submit'
                            style={{
                                width: '100%',
                                padding: '14px',
                                backgroundColor: '#789461',
                                color: '#fff',
                                fontSize: '16px',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontFamily: '"Quicksand", sans-serif',
                            }}
                        >Provide Feedback</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EventFeedback;
