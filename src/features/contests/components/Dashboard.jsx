import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

export default function ContestDashboard ({contest}) {
    const [countdown, setCountdown] = useState(calculateCountdown());

    // Calculate countdown time
    function calculateCountdown(contestStatus) {
        const now = new Date();
        let distance = 0;

        if(contestStatus==="Upcoming"){
            distance = contest.beginTime - now;
        }else if(contestStatus==="Running"){
            distance = contest.beginTime + contest.contestLength - now;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(days){
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
        if (hours) {
            return `${hours}h ${minutes}m ${seconds}s`;
        }
        if (minutes) {
            return `${minutes}m ${seconds}s`;
        }
        if(seconds){
            return `${seconds}s`;
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(contest.beginTime>Date.now()){
                setCountdown(calculateCountdown("Upcoming"));
            }if (
                contest.beginTime + contest.contestLength > Date.now() &&
                contest.beginTime <= Date.now()
            ) {
                setCountdown(calculateCountdown("Running"));
            }
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
            <div className="flex flex-col items-center mb-4">
                {contest.beginTime > Date.now() && (
                    <div className="flex items-center text-xl">
                        <FontAwesomeIcon
                            icon={faClock}
                            className="text-gray-500 mr-2"
                        />
                        <p className="text-gray-700">
                            Starts in:
                            <span className="font-bold ml-1">{countdown}</span>
                        </p>
                    </div>
                )}
                {contest.beginTime + contest.contestLength > Date.now() &&
                    contest.beginTime <= Date.now() && (
                        <div className="text-center">
                            <div className="items-center text-xl mx-8 mb-3">
                                <span className="text-gray-700">
                                    Contest is running...
                                </span>
                            </div>
                            <div className="flex item-center text-xl">
                                <FontAwesomeIcon
                                    icon={faClock}
                                    className="text-gray-500 mr-2"
                                />
                                <p className="text-gray-700">
                                    Remaining:
                                    <span className="font-bold ml-1">
                                        {countdown}
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}
                {contest.beginTime + contest.contestLength < Date.now() && (
                    <div className="flex items-center text-xl">
                        <p className="text-gray-700">
                            The Contest has finished
                        </p>
                    </div>
                )}
            </div>
            {contest.privacy !== "Public" && (
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
                            <FontAwesomeIcon
                                icon={faSignInAlt}
                                className="mr-2"
                            />
                            Sign Up
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
