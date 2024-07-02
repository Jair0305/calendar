import React from 'react';

export type EventType = {
    id?: number;
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
    location: {
        placeId: string;
        name: string;
        formattedAddress: string;
        latitude: number;
        longitude: number;
    } | null;
};
export type EventsContextType = {
    events: EventType[];
    setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
    addEvent: (event: EventType) => void;
};

export const EventsContext = React.createContext<EventsContextType | null>(null);