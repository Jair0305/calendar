import React, { useEffect, useState } from 'react';

type DayInformationProps = {
    selectedDay: Date | null;
};

type Event = {
};

const DayInformation: React.FC<DayInformationProps> = ({ selectedDay }) => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        if (selectedDay) {
            fetch('http://localhost:8080/api/v1/events', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date: selectedDay.toISOString() }),

            })
                .then((response) => response.json())
                .then((data) => setEvents(data))
                .catch((error) => console.error('Error:', error));
        }
    }, [selectedDay]);

    return (
        <div>
            <h2>Events on {selectedDay?.toDateString()}</h2>
            {events.length > 0 ? (
                events.map((event, index) => (
                    <div key={index}>
                    </div>
                ))
            ) : (
                <p>No events on this day.</p>
            )}
        </div>
    );
};

export default DayInformation;