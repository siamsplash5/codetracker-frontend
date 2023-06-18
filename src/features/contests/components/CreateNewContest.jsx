import React, { useState } from "react";
import DatePicker from "../../../components/DatePicker";
import {
    PenToSquareIconDefault,
    PlusIconDefault
} from "../../../components/Icons";
import LengthPicker from "../../../components/LengthPicker";
import TimePicker from "../../../components/TimePicker";


const FormComponent = () => {
    const [privacy, setPrivacy] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [length, setLength] = useState("");
    const [description, setDescription] = useState("");
    const [announcement, setAnnouncement] = useState("");
    const [totalProblemTab, setTotalProblemTab] = useState(0);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
    };

    const handleLengthChange = (e) => {
        setLength(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleAnnouncementChange = (e) => {
        setAnnouncement(e.target.value);
    };

    const handleAddProblem = (e) => {
        setTotalProblemTab((prev)=> prev+1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mr-5 p-4">
                <h2 className="text-center">
                    <PenToSquareIconDefault />
                    Create a new contest
                </h2>
                <br />
                <PrivacyOption value={privacy} onChange={setPrivacy} />

                {privacy === "private" || privacy === "protected" ? (
                    <PasswordComponent onPasswordChange={setPassword} onConfirmPasswordChange={setConfirmPassword}/>
                ) : null}

                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        maxLength={100}
                        value={title}
                        placeholder="Contest title (max 100 characters)"
                        onChange={handleTitleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="flex space-x-4 flex-row mb-4">
                    <div className="w-1/3">
                        <label
                            htmlFor="startDate"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Begin Date (MM : DD : YYYY)
                        </label>

                        <DatePicker
                            selectedDate={startDate}
                            onChange={handleStartDateChange}
                        />
                    </div>

                    <div className="w-1/3">
                        <label
                            htmlFor="startTime"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Begin Time (24-hour format)
                        </label>

                        <TimePicker value={startTime} onChange={setStartTime} />
                    </div>

                    <div className="w-1/3">
                        <label
                            htmlFor="length"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Contest Length
                        </label>
                        <LengthPicker value={length} onChange={setLength} />
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        maxLength={4000}
                        value={description}
                        placeholder="Write contest description"
                        onChange={handleDescriptionChange}
                        className="block h-32 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="announcement"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Announcement
                    </label>
                    <textarea
                        id="announcement"
                        name="announcement"
                        maxLength={1000}
                        value={announcement}
                        placeholder="Write contest announcement"
                        onChange={handleAnnouncementChange}
                        className="block h-32 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <br />
                <hr />
                <br />
                {Array.from({ length: totalProblemTab }, (_, index) => (
                    <SetProblem/>
                ))}
                <button
                    type="button"
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-800 rounded-md hover:bg-indigo-900 focus:outline-none focus:bg-indigo-900"
                    onClick={handleAddProblem}
                >
                    <PlusIconDefault />
                    Add a problem
                </button>
                <br />
                <br />
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-800 rounded-md hover:bg-indigo-900 focus:outline-none focus:bg-indigo-900"
                >
                    <PenToSquareIconDefault />
                    Create
                </button>
            </form>
        </>
    );
};

export default FormComponent;
