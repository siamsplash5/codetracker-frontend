import React, { useState } from "react";

const TimePicker = ({ value, onChange }) => {
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");

    const handleHoursChange = (e) => {
        const newHours = e.target.value;
        setHours(newHours);
        onChange(newHours + ":" + minutes);
    };

    const handleMinutesChange = (e) => {
        const newMinutes = e.target.value;
        setMinutes(newMinutes);
        onChange(hours + ":" + newMinutes);
    };

    return (
        <div className="flex">
            <input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={handleHoursChange}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="HH"
                required
            />
            <span className="mx-2 text-gray-500">:</span>
            <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={handleMinutesChange}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="MM"
                required
            />
        </div>
    );
};

export default TimePicker;
