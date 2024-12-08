import React from "react";
import '../styles/globals.css';

interface EventCardProps{
    eventName: string;
    eventDate: string;
    pointsEarned: number;
}

const EventCard: React.FC<EventCardProps> = ({ eventName, eventDate, pointsEarned }) =>{
    return(
        <div className="event-card">
            <h3>{eventName}</h3>
            <p>{eventDate}</p>
            <p>Points earned: {pointsEarned}</p>
        </div>
    );
};

export default EventCard;