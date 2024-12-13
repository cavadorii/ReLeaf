import React from 'react';
import '../styles/globals.css';


interface UserInfoProps {
  username: string;
  profilePic: string;
  location: string;
  points: number;
  nrTrees: number;
}

const UserInfo: React.FC<UserInfoProps> = ({ username, profilePic, location, nrTrees, points}) => {
  return (
    <div className="user-info">
      <img className="profile-pic" src={profilePic} alt="Profile Picture" />
      <h1 className="username">{username}</h1>
      <p className="location">{location}</p>
      <div className="stats">
        <div>
          <span className="number">{nrTrees}</span>
          <p>Planted trees</p>
        </div>
        <div>
          <span className="number">{points}</span>
          <p>Points</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
    