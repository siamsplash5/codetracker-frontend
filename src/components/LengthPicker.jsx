import React, { useState } from "react";

const LengthPicker = ({ value, onChange }) => {
    const [days, setDays] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");

    const handleDaysChange = (e) => {
        const newDays = e.target.value;
        setDays(newDays);
        onChange(newDays + ":" + newHours + ":" + minutes);
    };

    const handleHoursChange = (e) => {
        const newHours = e.target.value;
        setHours(newHours);
        onChange(newDays + ":" + newHours + ":" + minutes);
    };

    const handleMinutesChange = (e) => {
        const newMinutes = e.target.value;
        setMinutes(newMinutes);
        onChange(newDays + ":" + newHours + ":" + minutes);
    };

    return (
        <div className="flex">
            <input
                type="number"
                min="0"
                max="365"
                value={days}
                onChange={handleDaysChange}
                defaultValue="0"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="DD"
            />
            <span className="mx-2 text-gray-500">:</span>
            <input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={handleHoursChange}
                defaultValue="0"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="HH"
            />
            <span className="mx-2 text-gray-500">:</span>
            <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={handleMinutesChange}
                defaultValue="0"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="MM"
                required
            />
        </div>
    );
};

export default LengthPicker;
