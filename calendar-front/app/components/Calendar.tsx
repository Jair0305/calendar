import React, {useState} from 'react';

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

    return (
        <div className="flex flex-col gap-4 mx-auto max-w-screen-md">
            <div className="grid grid-cols-3">
                <div className="border p-2">
                    Month:{monthName}
                    <button onClick={incrementMonth}>arriba</button>
                    <button onClick={decrementMonth}>abajo</button>
                </div>
                <div className="border p-2">
                    <button onClick={returnPresent}>return to present</button>
                </div>
                <div className="border p-2">
                    Year: {year}
                    <button onClick={incrementYear}>arriba</button>
                    <button onClick={decrementYear}>abajo</button>
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

                    return (
                        <div
                            key={index}
                            className={`border p-2 w-full h-40 ${day.getMonth() + 1 === month ? '' : 'text-gray-500' } ${isToday ? 'day_border' : ''}  `}

                        >
                            <span className={isToday ? 'day-number' : ''}>
                                {day.getDate()}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;