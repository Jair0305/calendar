import React, { useEffect, useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";

type DayInformationProps = {
    selectedDay: Date | null;
};

type Event = {
};

const DayInformation: React.FC<DayInformationProps> = ({ selectedDay }) => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        if (selectedDay) {
            const formattedDate = selectedDay.toISOString().split('T')[0];
            console.log(formattedDate)
            fetch(`http://localhost:8080/api/v1/events/date?date=${formattedDate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data); // Agrega esta línea
                    setEvents(data);
                })
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