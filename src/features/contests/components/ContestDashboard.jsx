import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/AuthContext";
import calculateCountdown from "../../../utils/calculateCountdown";
import sleep from "../../../utils/sleep";
import axios from "axios";
import ServerError from "../../../components/ServerError";
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";

export default function ContestDashboard(props) {
    const [contest, setContest] = useState(props.contest);
    const [countdown, setCountdown] = useState(calculateCountdown());
    const [password, setPassword] = useState("");
    const { currentUser } = useAuth();
    const [isRegistered, setIsRegistered] = useState(contest.registered.includes(currentUser));
    const navigate = useNavigate();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [showServerError, setShowServerError] = useState(false);


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (contest.beginTime > Date.now()) {
                setCountdown(calculateCountdown(contest, "Upcoming"));
            }
            if (
                contest.beginTime + contest.contestLength > Date.now() &&
                contest.beginTime <= Date.now()
            ) {
                setCountdown(calculateCountdown(contest, "Running"));
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        if(currentUser===null){
            navigate('/login');
        }
        if (contest.privacy !== "Public" && password !== contest.password) {
            setErrorMessage("");
            await sleep(100);
            setErrorMessage("Invalid password");
            setShowErrorMessage(true);
        } else {
            try {
                const { data: updatedContest } = await axios.post(
                    "/api/contest/register/",
                    {
                        contestID: contest.contestID,
                        currentUser,
                    }
                );
                if(data.status===401){
                    navigate('/login');
                }else{
                    setIsRegistered(true);
                    setContest(updatedContest);
                }
            } catch (error) {
                console.log(error);
                setShowServerError(true);
            }
        }
    }

    return (
        <>
            {showServerError && <ServerError />}
            {!showServerError && (
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
                                    <span className="font-bold ml-1">
                                        {countdown}
                                    </span>
                                </p>
                            </div>
                        )}
                        {contest.beginTime + contest.contestLength >
                            Date.now() &&
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
                        {contest.beginTime + contest.contestLength <
                            Date.now() && (
                            <div className="flex items-center text-xl">
                                <p className="text-gray-700">
                                    The Contest has finished
                                </p>
                            </div>
                        )}
                    </div>
                    {!isRegistered && contest.privacy !== "Public" && (
                        <div className="flex flex-col items-center">
                            <form
                                className="flex flex-col items-center"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="password"
                                    placeholder="Enter contest password"
                                    className="px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                {showErrorMessage && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-m mb-2 text-red-600">
                                            {errorMessage}
                                        </span>
                                    </div>
                                )}
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
            )}
        </>
    );
}
