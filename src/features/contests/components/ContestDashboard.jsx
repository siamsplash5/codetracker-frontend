import { faCheckSquare, faClock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { data } from "autoprefixer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiConfig from "../../../config/apiConfig";
import ServerError from "../../../components/ServerError";
import { useAuth } from "../../../context/AuthContext";
import calculateCountdown from "../../../utils/calculateCountdown";
import sleep from "../../../utils/sleep";

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
                const token = localStorage.getItem("JSESSIONID");
                const { data: updatedContest } = await axios.post(
                    apiConfig.registerContest,
                    {
                        contestID: contest.contestID,
                        currentUser,
                        token,
                    }
                );
                if(data.status===401){
                    navigate('/login');
                }else{
                    setIsRegistered(true);
                    const {onRegister} = props;
                    onRegister();
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
                                            <FontAwesomeIcon icon={faClock} />{" "}
                                            Contest is running...
                                        </span>
                                    </div>
                                    <div className="flex item-center justify-center text-xl">
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
                                <h4 className="text-gray-700 items-center justify-center">
                                    <FontAwesomeIcon icon={faCheckSquare} className="text-xl"/>{" "} The Contest has finished
                                </h4>
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
                                    className="px-6 py-3 bg-indigo-800 text-white rounded-md flex items-center transition-colors duration-300 hover:bg-indigo-900 focus:outline-none"
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
