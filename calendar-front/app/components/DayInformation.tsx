import React, { useEffect, useState, useRef } from 'react';

type DayInformationProps = {
    selectedDay: Date | null;
};

type Event = {
};

const DayInformation: React.FC<DayInformationProps> = ({ selectedDay }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            if (selectedDay) {
                const formattedDate = selectedDay.toISOString().split('T')[0];
                fetch(`http://localhost:8080/api/v1/events/date?date=${formattedDate}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setEvents(data);
                        console.log(events);
                    })
                    .catch((error) => console.error('Error:', error));
            }
        }, 500); // 500ms de retraso

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
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