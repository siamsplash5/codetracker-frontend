import React, { useState } from "react";

const DatePicker = ({ selectedDate, onChange }) => {
    const [date, setDate] = useState(selectedDate || "");

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        onChange(newDate);
    };

    return (
        <input
            type="date"
            value={date}
            onChange={handleDateChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    );
};

export default DatePicker;
