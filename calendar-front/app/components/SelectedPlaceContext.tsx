import React from 'react';
type SelectedPlaceType = {
    selectedPlace: {
        placeId: string;
        name: string;
        formattedAddress: string;
        latitude: number;
        longitude: number;
    };
    setSelectedPlace: React.Dispatch<React.SetStateAction<{
        placeId: string;
        name: string;
        formattedAddress: string;
        latitude: number;
        longitude: number;
    }>>;
};

export const SelectedPlaceContext = React.createContext<SelectedPlaceType | null>(null);