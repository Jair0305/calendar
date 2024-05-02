import React from 'react';

type CalendarProps = {
    month: number;
    year: number;
};

function getDaysInMonth(month: number, year: number) {
    const date = new Date(year, month - 1, 1);
    const days = [];
    while (date.getMonth() === month - 1) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

const Calendar: React.FC<CalendarProps> = ({ month, year }) => {
    const days = getDaysInMonth(month, year);
    const firstDay = new Date(year, month - 1, 1).getDay();

    return (
        <div className="grid grid-cols-7 gap-4">
            <div className="border p-2">Sun</div>
            <div className="border p-2">Mon</div>
            <div className="border p-2">Tue</div>
            <div className="border p-2">Wed</div>
            <div className="border p-2">Thu</div>
            <div className="border p-2">Fri</div>
            <div className="border p-2">Sat</div>
            {Array(firstDay).fill(null).map((_, index) => (
                <div key={`empty-${index}`} className="border p-2" />
            ))}
            {days.map((day, index) => (
                <div key={index} className="border p-2 w-full h-60">
                    {day.getDate()}
                </div>
            ))}
        </div>
    );
};

export default Calendar;