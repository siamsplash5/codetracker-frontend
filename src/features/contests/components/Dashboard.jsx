import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

export default function ContestDashboard ({contest: cl}) {
    // Sample contest data
    const contest = {
        title: cl.title,
        description: cl.description,
        startDate: new Date("2023-07-01T09:00:00Z"),
        endDate: new Date("2023-07-02T17:00:00Z"),
    };

    const [countdown, setCountdown] = useState(calculateCountdown());

    // Calculate countdown time
    function calculateCountdown() {
        const now = new Date().getTime();
        const distance = contest.startDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(calculateCountdown());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="flex flex-col justify-center items-center p-8">
            <h1 className="text-4xl font-bold text-center mb-8">
                {contest.title}
            </h1>
            <p className="text-lg text-gray-700 text-center mb-8">
                {contest.description}
            </p>
            <div className="flex flex-col items-center mb-8">
                <div className="flex items-center mb-4">
                    <FontAwesomeIcon
                        icon={faClock}
                        className="text-gray-500 mr-2"
                    />
                    <p className="text-gray-700">
                        Starts in:
                        <span className="font-bold ml-1">{countdown}</span>
                    </p>
                </div>
                <div className="flex items-center">
                    <FontAwesomeIcon
                        icon={faClock}
                        className="text-gray-500 mr-2"
                    />
                    <p className="text-gray-700">
                        Ends on:
                        <span className="font-bold ml-1">
                            {contest.endDate.toLocaleString()}
                        </span>
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <form className="flex flex-col items-center">
                    <input
                        type="password"
                        placeholder="Enter contest password"
                        className="px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-500 text-white rounded-md flex items-center transition-colors duration-300 hover:bg-blue-600 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};
