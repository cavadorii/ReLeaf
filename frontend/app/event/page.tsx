'use client'; 
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import '../styles/globals.css';

const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVolunteer, setIsVolunteer] = useState<boolean>(false);
  const [treesPlanted, setTreesPlanted] = useState<number>(0);
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [volunteerList, setVolunteerList] = useState<any[]>([]);
  const [volunteerLeaderboard, setVolunteerLeaderboard] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId || !eventId) {
        setError('User or Event ID not found.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
  
        // 1) Fetch the logged-in user
        const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
        if (userResponse.status !== 200) throw new Error('User not found');
        if (userResponse.data.role === 'volunteer') setIsVolunteer(true);
  
        // 2) Fetch the event
        const eventResponse = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        if (eventResponse.status !== 200) throw new Error('Error fetching event details');
        const eventData = eventResponse.data;
        setEvent(eventData);
  
        // 3) Check if current user is already in volunteers
        const volunteers = eventData.volunteers || [];
        setIsJoined(volunteers.some((v: any) => v.user_id === userId));
  
        // 4) Fetch the list of volunteers from the new volunteers route
        const volunteersResponse = await axios.get(`http://localhost:5000/api/events/${eventId}/volunteers`);
        const volunteersRaw = volunteersResponse.data;
  
        // 5) For each volunteer, fetch username from your new endpoint
        const volunteersWithNames = await Promise.all(
          volunteersRaw.map(async (vol: any) => {
            try {
              const userNameRes = await axios.get(`http://localhost:5000/api/users/username/${vol.user_id}`);
              return { ...vol, username: userNameRes.data.username };
            } catch {
              return { ...vol, username: 'Unknown User' };
            }
          })
        );
        setVolunteerList(volunteersWithNames);
  
        // 6) Fetch tree photos and calculate the count
        const photosResponse = await axios.get('http://localhost:5000/api/tree-photos');
        const photos = photosResponse.data?.data || [];
        const filteredPhotos = photos.filter(
          (photo: { event_id: string; user_id: string; is_valid: boolean; }) => photo.event_id === eventId && photo.user_id === userId && photo.is_valid === true
        );
        setTreesPlanted(filteredPhotos.length);


        // 7) Set leaderboard
        const volunteersWithTreeCounts = await Promise.all(
          volunteers.map(async (vol: any) => {
            const treePhotos = photos.filter(
              (photo: { event_id: string; user_id: string; is_valid: boolean }) =>
                photo.event_id === eventId && photo.user_id === vol.user_id && photo.is_valid
            );
            const usernameResponse = await axios.get(`http://localhost:5000/api/users/username/${vol.user_id}`);
            return {
              userId: vol.user_id,
              username: usernameResponse.data?.username || 'Unknown User',
              treesPlanted: treePhotos.length,
            };
          })
        );

        const sortedVolunteers = volunteersWithTreeCounts.sort((a, b) => b.treesPlanted - a.treesPlanted);
        setVolunteerLeaderboard(sortedVolunteers);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventId]);

  const handleJoinEvent = async () => {
    if (!event) return;
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('User ID not found');

      const volunteers = Array.isArray(event.volunteers) ? event.volunteers : [];
      if (volunteers.some((v: any) => v.user_id === userId)) {
        setPopupMessage('You have already joined this event!');
        return;
      }

      // 1) Update the event with new volunteer
      const newVolunteer = { user_id: userId, status: 'Accepted' };
      const updatedEvent = { ...event, volunteers: [...volunteers, newVolunteer] };
      const { _id, ...updatePayload } = updatedEvent;

      const updateResponse = await axios.put(`http://localhost:5000/api/events/${_id}`, updatePayload);

      // 2) Create the registration record
      const registration = { event_id: _id, user_id: userId, status: 'Accepted', points_awarded: 0 };
      const addRegistrationResponse = await axios.post("http://localhost:5000/api/registrations", registration);

      if (updateResponse.status === 200 && addRegistrationResponse.status === 201) {
        setIsJoined(true);
        setPopupMessage('You have successfully joined the event!');

        // 3) Fetch the user’s name, update volunteer list
        const userNameRes = await axios.get(`http://localhost:5000/api/users/username/${userId}`);
        const userName = userNameRes.data?.username || 'Unknown User';
        setVolunteerList([...volunteerList, { ...newVolunteer, username: userName }]);
      } else {
        throw new Error('Failed to update event details');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };


  const handleBack = () => {
    router.back();
  };

  const handleUploadTreePhoto = () => {
    router.push(`/uploadTreePhoto/?eventId=${eventId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>No event details available.</div>;

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '"Quicksand", sans-serif',
    paddingTop: '60px',
  };

  const boxStyle: React.CSSProperties = {
    backgroundColor: '#CBD2A4',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
    position: 'relative',
  };

  const backButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    padding: '5px 10px',
    fontSize: '16px',
    color: '#FFFFFF',
    backgroundColor: '#54473F',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: 10,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#54473F',
    marginBottom: '20px',
    marginTop: '50px',
  };

  const detailStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
  };

  const joinButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#FFFFFF',
    backgroundColor: isJoined ? '#A9A9A9' : '#54473F',
    border: 'none',
    borderRadius: '5px',
    cursor: isJoined ? 'not-allowed' : 'pointer',
    marginTop: '20px',
    alignSelf: 'center',
  };

  const uploadTreePhotoButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#FFFFFF',
    backgroundColor: '#54473F',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    alignSelf: 'center',
  };

  const popupStyle: React.CSSProperties = {
    marginTop: '10px',
    color: '#4CAF50',
    fontWeight: 'bold',
  };

  const volunteersContainerStyle: React.CSSProperties = {
    marginTop: '40px',
    textAlign: 'left',
    color: '#333',
  };

  const volunteerItemStyle: React.CSSProperties = {
    backgroundColor: '#eee',
    margin: '5px 0',
    padding: '10px',
    borderRadius: '5px',
    fontFamily: '"Quicksand", sans-serif',
    fontSize: '15px',
  };
  const leaderboardContainerStyle: React.CSSProperties = {
    marginTop: '20px',
    textAlign: 'left',
    color: '#333',
  };

  const leaderboardItemStyle: React.CSSProperties = {
    backgroundColor: '#eee',
    margin: '5px 0',
    padding: '10px',
    borderRadius: '5px',
    fontFamily: '"Quicksand", sans-serif',
    fontSize: '15px',
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <button style={backButtonStyle} onClick={handleBack}>Back</button>
        <h1 style={titleStyle}>{event.title}</h1>
        <p style={detailStyle}>{event.description}</p>
        <p style={detailStyle}>
          Location: {event.location?.address || 'No location available'}
        </p>
        <p style={detailStyle}>
          Date: {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
        </p>

        <p style={detailStyle}>
        Trees Planted: {treesPlanted}
      </p>

        <button
          style={joinButtonStyle}
          onClick={handleJoinEvent}
          disabled={isJoined}
        >
          {isJoined ? 'Already Joined' : 'Join Event'}
        </button>

        {isJoined && new Date(event.end_date) >= new Date() && (
          <button style={uploadTreePhotoButtonStyle} onClick={handleUploadTreePhoto}>
            Upload Tree Photo
          </button>
        ) }
        
        {new Date(event.end_date) < new Date() &&
          (
            <p style={{ color: '#FF0000', marginTop: '20px' }}>Event finished</p>
          )
        }
        
        
        



        {popupMessage && <div style={popupStyle}>{popupMessage}</div>}

        <div style={leaderboardContainerStyle}>
          <h2>Leaderboard</h2>
          {volunteerLeaderboard.map((vol, idx) => (
            <div key={idx} style={leaderboardItemStyle}>
              {idx + 1}. {vol.username}: {vol.treesPlanted} trees
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
