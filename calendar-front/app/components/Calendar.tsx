import React, {useState} from 'react';
import Sidebar from "@/app/components/Sidebar";
import { CiCirclePlus } from "react-icons/ci";

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

    return (
    <div className="flex flex-col gap-4 mx-auto max-w-screen-md">
        <div className="grid grid-cols-3">
            <div className="border p-2 flex gap-2   ">
                <button onClick={incrementMonth}>{`<`}</button>
                    Month:{monthName}
                <button onClick={decrementMonth}>{`>`}</button>
            </div>
            <div className="border p-2">
                <button onClick={returnPresent}>return to present</button>
            </div>
            <div className="border p-2 flex gap-2">
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

                return (
                    <div
                        key={index}
                        className={`border p-2 w-full h-28 cursor-pointer  ${day.getMonth() + 1 === month ? '' : 'text-gray-500' } ${isToday ? 'day-border' : ''}  `}
                        onClick={() => handleClick()}
                    >
                        <span className={isToday ? 'day-number' : ''}>
                            {day.getDate()}
                        </span>
                    </div>
                );
            })}
            <Sidebar isOpen={isOpen} onClose={closeSideBar} selectedDay={today}>
            </Sidebar>
        </div>
    </div>
);
};

export default Calendar;