import React, { useEffect, useRef, useState } from 'react';
import { LatLong } from '@/types';
import { useJsApiLoader } from '@react-google-maps/api';
import { Library } from "@googlemaps/js-api-loader";
import { Input } from "postcss";

const libs: Library[] = ["core", "maps", "places", "marker"]

const buildMapInfoCardContent = (title: string, body: string) => {
    return `
        <div>
            <h2 class="map_infocard_title">${title}</h2>
            <p>${body}</p>
        </div>
    `
}

function Map(latlong: LatLong) {

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [marker, setMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null); // single marker state
    const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAf5IiKjD5eRO8zfEXVpeW3nHJ9Pnz2Tfk",
        libraries: libs
    });

    const mapRef = useRef<HTMLDivElement>(null);
    const placeAutoCompleteRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isLoaded) {
            const mapOptions = {
                center: {
                    lat: 20.50746941908944,
                    lng: -101.19342889745681
                },
                zoom: 12,
                mapId: 'MY-MAP-1234'
            }
            const gMap = new google.maps.Map(mapRef.current as HTMLDivElement, mapOptions);

            const americaBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(69.640688, -141.118795),
                new google.maps.LatLng(-55.004663, -33.013331)
            );

            const gAutoComplete = new google.maps.places.Autocomplete(placeAutoCompleteRef.current as HTMLInputElement, {
                bounds: americaBounds,
                fields: ['place_id', 'geometry', 'name'],
                componentRestrictions: {
                    country: ['ca', 'us', 'mx']
                }
            });

            setAutoComplete(gAutoComplete);
            setMap(gMap);
        }
    }, [isLoaded]);

    useEffect(() => {
        if (autoComplete) {
            autoComplete.addListener('place_changed', () => {
                const place = autoComplete.getPlace();
                setSelectedPlace(place.formatted_address as string);
                const position = place.geometry?.location;

                if (position && map) {
                    map.setCenter(position);
                    setSingleMarker(position, place.name!);
                }
            });
        }
    }, [autoComplete, map])

    useEffect(() => {
        // Clear the marker when the component unmounts
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    function setSingleMarker(position: google.maps.LatLng) {
        if (!map) return;

        // Clear existing marker
        if (marker) {
            marker.setMap(null);
        }

        // Get place details based on clicked position
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: position }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    const name = results[0].formatted_address;
                    const newMarker = new google.maps.Marker({
                        map: map,
                        position: position,
                        title: name
                    });

                    // Set new marker to state
                    setMarker(newMarker);

                    // Open info window
                    const infoCard = new google.maps.InfoWindow({
                        position: position,
                        content: buildMapInfoCardContent(name, position.toString()),
                        maxWidth: 200
                    });

                    infoCard.open({
                        map: map,
                        anchor: newMarker
                    });
                } else {
                    console.error("No results found");
                }
            } else {
                console.error("Geocoder failed due to: " + status);
            }
        });
    }


    useEffect(() => {
        // Handle click on the map to set marker
        if (map) {
            const clickListener = map.addListener('click', (event) => {
                const clickedPosition = event.latLng;
                const clickedName = "New Marker";
                setSingleMarker(clickedPosition, clickedName);
            });

            // Remove the event listener when the component unmounts to avoid memory leaks
            return () => {
                google.maps.event.removeListener(clickListener);
            };
        }
    }, [map]);

    return (
        <div className="flex flex-col gap-0.5 justify-center items-center">
            <input ref={placeAutoCompleteRef} type="text" placeholder="Enter a location" className="text-black p-2 rounded-lg w-full" onFocus={(e) => e.target.value == "" ? null : e.target.select()} />
            <label className="text-black">{selectedPlace}</label>
            {isLoaded ?
                <div className="h-[500px] w-[500px]" ref={mapRef} />
                : <p>Loading...</p>
            }
        </div>
    );
}

export default Map;
