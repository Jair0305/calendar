import React, { useEffect, useState } from 'react';

type DayInformationProps = {
    selectedDay: Date | null;
};

type Event = {
    id: number;
    coverPhoto: string;
    date: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    body: string;
    urlMeeting: string;
    urlEvent: string;
    online: boolean;
    endDate: string;
    location: string | null;
};

const DayInformation: React.FC<DayInformationProps> = ({ selectedDay }) => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        if (selectedDay) {
            const formattedDate = selectedDay.toISOString().split('T')[0];
            fetch(`http://localhost:8080/api/v1/events/date?date=${formattedDate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error:', error));
        }
    }, [selectedDay]);

    return (
        <div>
            <h2>Events on {selectedDay?.toDateString()}</h2>
            {events.length > 0 ? (
                events.map((event, index) => (
                    <div key={index}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                    </div>
                ))
            ) : (
                <p>No events on this day.</p>
            )}
        </div>
    );
};

export default DayInformation;