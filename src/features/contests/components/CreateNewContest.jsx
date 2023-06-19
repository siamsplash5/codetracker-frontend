import React, { useState } from "react";
import { useEffect } from "react";
import Announcement from "../../../components/Announcement";
import DatePicker from "../../../components/DatePicker";
import Description from "../../../components/Description";
import {
    PenToSquareIconDefault,
    PlusIconDefault,
} from "../../../components/Icons";
import LengthPicker from "../../../components/LengthPicker";
import TimePicker from "../../../components/TimePicker";
import Title from "../../../components/Title";
import PasswordComponent from "./PasswordComponent";
import PrivacyOption from "./PrivacyOption";
import SetContestProblem from "./SetContestProblem";

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
    const [tabs, setTabs] = useState(
        Array.from({ length: totalProblemTab }, () => true)
    );

    const handleAddProblem = (e) => {
        setTotalProblemTab((prev) => prev + 1);
    };

    useEffect(() => {
        setTabs((prev) => {
            const newTabs = [...prev, true];
            return newTabs;
        });
    }, [totalProblemTab]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({privacy, password, confirmPassword, title, startDate, startTime, length, description, announcement});
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
                    <PasswordComponent
                        onPasswordChange={setPassword}
                        onConfirmPasswordChange={setConfirmPassword}
                    />
                ) : null}

                <div className="mb-4">
                    <Title
                        value={title}
                        onChange={setTitle}
                        titleFor="Contest"
                    />
                </div>

                <div className="flex space-x-4 flex-row mb-4">
                    <div className="w-1/3">
                        <DatePicker
                            selectedDate={startDate}
                            onChange={setStartDate}
                        />
                    </div>

                    <div className="w-1/3">
                        <TimePicker value={startTime} onChange={setStartTime} />
                    </div>

                    <div className="w-1/3">
                        <LengthPicker value={length} onChange={setLength} />
                    </div>
                </div>
                <div className="mb-4">
                    <Description
                        value={description}
                        onChange={setDescription}
                    />
                </div>
                <div className="mb-4">
                    <Announcement
                        value={announcement}
                        onChange={setAnnouncement}
                    />
                </div>

                <hr />
                <br />

                <div className="w-1/4 mb-4">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-800 rounded-md hover:bg-indigo-900 focus:outline-none focus:bg-indigo-900"
                        onClick={handleAddProblem}
                    >
                        <PlusIconDefault />
                        Add a problem
                    </button>
                </div>

                <div className="mb-4">
                    {tabs.map(
                        (isMounted, index) =>
                            isMounted && (
                                <SetContestProblem
                                    key={index}
                                    index={index}
                                    setTabs={setTabs}
                                />
                            )
                    )}
                </div>

                <hr />
                <br />

                <div className="mb-4">
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-800 rounded-md hover:bg-indigo-900 focus:outline-none focus:bg-indigo-900"
                    >
                        <PenToSquareIconDefault />
                        Create Contest
                    </button>
                </div>
            </form>
        </>
    );
};

export default FormComponent;
