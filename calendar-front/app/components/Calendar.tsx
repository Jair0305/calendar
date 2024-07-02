import React, {useEffect, useState} from 'react';
import Sidebar from "@/app/components/Sidebar";
import { CiCirclePlus } from "react-icons/ci";
import {SelectedPlaceContext} from "./SelectedPlaceContext";
import { EventType, EventsContext } from "./EventsContext";

type CalendarProps = {
    initialMonth: number;
    initialYear: number;
};


function getDaysInMonth(month: number, year: number) {
    const date = new Date(year, month - 1, 1);
    const days = [];

    const firstDayOfWeek = date.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
        const previousDate = new Date(year, month - 1, -i);
        days.unshift(previousDate);
    }

    while (date.getMonth() === month - 1) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    const lastDayOfWeek = days[days.length - 1].getDay();
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
        const nextDate = new Date(year, month, i);
        days.push(nextDate);
    }

    return days;
}

const Calendar: React.FC<CalendarProps> = ({ initialMonth, initialYear }) => {

    const [selectedPlace, setSelectedPlace] = useState({
        placeId: "",
        name: "",
        formattedAddress: "",
        latitude: 0,
        longitude: 0,
    });

    const [month, setMonth] = useState(initialMonth);
    const [year, setYear] = useState(initialYear);

    const days = getDaysInMonth(month, year);
    const monthName = new Date(year, month - 1).toLocaleString('en-US', { month: 'long' });

    const incrementMonth = () => {
        if(month === 12){
            setMonth(1);
            setYear(year + 1);
        } else
        {
            setMonth(month + 1);
        }
    };

    const decrementMonth = () =>{
        if(month === 1)
        {
            setMonth(12);
            setYear(year - 1);
        }else
        {
            setMonth(month - 1);
        }
    };

    const incrementYear = () => {
        setYear(year + 1);
    }

    const decrementYear = () => {
        setYear(year - 1);
    }

    const returnPresent = () => {
        setYear(initialYear);
        setMonth(initialMonth);
    }

    const [events, setEvents] = useState<EventType[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [today, setToday] = useState(new Date());
    const openSideBar = ({day}: { day: any }) => {
        setSelectedDay(day);
        setIsOpen(true);
    };

    const closeSideBar = () => {
        setIsOpen(false);
    };

    const handleEventClick = (event: EventType) => {
        // Perform the desired action when the event title is clicked
        console.log('Event clicked:', event);
    };

    const addEvent = (newEvent: EventType) => {
        setEvents(prevEvents => [...prevEvents, newEvent])
    };

    return (
        <EventsContext.Provider value={{events, setEvents, addEvent}}>
            <SelectedPlaceContext.Provider value={{selectedPlace, setSelectedPlace}}>
                <div className="flex flex-col gap-4 mx-auto max-w-screen-lg">
                    <div className="grid grid-cols-3">
                        <div className=" justify-center border p-2 flex gap-2">
                            <button onClick={incrementMonth}>{`<`}</button>
                                Month:{monthName}
                            <button onClick={decrementMonth}>{`>`}</button>
                        </div>
                        <div className="border p-2 flex justify-center">
                            <button onClick={returnPresent}>return to present</button>
                        </div>
                        <div className="border p-2 flex gap-2 justify-center">
                            <button onClick={incrementYear}>{`<`}</button>
                                Year: {year}
                            <button onClick={decrementYear}>{`>`}</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-4">
                        <div className="border p-2">Sun</div>
                        <div className="border p-2">Mon</div>
                        <div className="border p-2">Tue</div>
                        <div className="border p-2">Wed</div>
                        <div className="border p-2">Thu</div>
                        <div className="border p-2">Fri</div>
                        <div className="border p-2">Sat</div>
                        {days.map((day, index) => {
                            const today = new Date();
                            const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear();

                            const handleClick = () => {
                                console.log('Day clickecd:', day);
                                openSideBar({day: day})
                                setToday(day);
                            }

                            const dayEvents = events.filter(event => {
                                const eventDate = new Date(event.date);
                                return eventDate.getDate() === day.getDate() && eventDate.getMonth() === day.getMonth() && eventDate.getFullYear() === day.getFullYear();
                            });

                            const isPastEvent = dayEvents.some(event => {
                                const eventDate = new Date(event.date);
                                return eventDate.getTime() < Date.now();
                            });

                            return (
                                <div
                                    key={index}
                                    className={`border p-2 w-full h-32 cursor-pointer  ${day.getMonth() + 1 === month ? '' : 'text-gray-500' } ${isToday ? 'day-border' : ''} ${dayEvents.length > 0 ? (isPastEvent ? 'day-with-past-event' : 'day-with-event') : ''} `}
                                    onClick={() => handleClick()}
                                >
                                    <span className={isToday ? 'day-number' : ''}>
                                        {day.getDate()}
                                    </span>

                                    {dayEvents.map((event, eventIndex) => (
                                        <p className={`bg-none select-text whitespace-nowrap overflow-hidden overflow-ellipsis hover:text-gray-500 cursor-pointer`} key={eventIndex} onClick={() => handleEventClick(event)}>
                                            {event.title}
                                        </p>
                                    ))}
                                </div>
                            );
                        })}
                        <Sidebar isOpen={isOpen} onClose={closeSideBar} selectedDay={today}>
                        </Sidebar>
                    </div>
                </div>
            </SelectedPlaceContext.Provider>
        </EventsContext.Provider>
    );
};

export default Calendar;
