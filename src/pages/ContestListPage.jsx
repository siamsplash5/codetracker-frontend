import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
    faCalendarAlt,
    faFlagCheckered,
    faList, faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import ServerError from "../components/ServerError";
import { useAuth } from "../context/AuthContext";
import { ContestList, CreateNewContest } from "../features/contests";

const fetchContestList = async (url) => {
    const { data } = await axios.get(url);
    if (data.status !== undefined) {
        console.log(data.message);
        return data.status.toString();
    }
    return data;
};

export default function ProfilePage() {
    const [selectedMenuItem, setSelectedMenuItem] = useState("menu5");
    const [showServerError, setShowServerError] = useState(false);
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    const { data, error } = useSWR("/api/contest-query/all", fetchContestList, {
        suspense: true,
    });

    useEffect(() => {
        if (data === "500") {
            setShowServerError(true);
        } else {
            setShowServerError(false);
        }
    }, [data, error]);

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <>
            {showServerError && <ServerError />}
            {!showServerError && (
                <div className="flex mx-10 mt-5">
                    <div className="w-4/5 overflow-y-auto max-h-screen pl-4">
                        <div className="p-4">
                            {selectedMenuItem === "menu1" && (
                                <ContestList contestList={data} />
                            )}
                            {selectedMenuItem === "menu2" && (
                                <div>
                                    <h1>Upcoming</h1>
                                </div>
                            )}
                            {selectedMenuItem === "menu3" && (
                                <div>
                                    <h1>Running</h1>
                                </div>
                            )}
                            {selectedMenuItem === "menu4" && (
                                <div>
                                    <h1>Finished</h1>
                                </div>
                            )}
                            <div className="p-4">
                                {selectedMenuItem === "menu5" &&
                                    (currentUser !== null ? (
                                        <CreateNewContest />
                                    ) : (
                                        navigate("/login")
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/5 bg-slate-800 text-white text-opacity-80 h-screen pr-4 ">
                        <div className="p-4">
                            <ul className="space-y-2">
                                <li
                                    className={`p-2 rounded cursor-pointer  ${
                                        selectedMenuItem === "menu1"
                                            ? "bg-gray-700"
                                            : ""
                                    }`}
                                    onClick={() => handleMenuItemClick("menu1")}
                                >
                                    <span className="pr-2">
                                        <FontAwesomeIcon icon={faList} />{" "}
                                    </span>{" "}
                                    All contest
                                </li>
                                <li
                                    className={`p-2 rounded cursor-pointer ${
                                        selectedMenuItem === "menu2"
                                            ? "bg-gray-700"
                                            : ""
                                    }`}
                                    onClick={() => handleMenuItemClick("menu2")}
                                >
                                    <span className="pr-2">
                                        <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                                    </span>
                                    Upcoming
                                </li>
                                <li
                                    className={`p-2 rounded cursor-pointer ${
                                        selectedMenuItem === "menu3"
                                            ? "bg-gray-700"
                                            : ""
                                    }`}
                                    onClick={() => handleMenuItemClick("menu3")}
                                >
                                    <span className="pr-2">
                                        <FontAwesomeIcon icon={faSpinner} />{" "}
                                    </span>
                                    Running
                                </li>
                                <li
                                    className={`p-2 rounded cursor-pointer ${
                                        selectedMenuItem === "menu4"
                                            ? "bg-gray-700"
                                            : ""
                                    }`}
                                    onClick={() => handleMenuItemClick("menu4")}
                                >
                                    <span className="pr-2">
                                        <FontAwesomeIcon
                                            icon={faFlagCheckered}
                                        />{" "}
                                    </span>
                                    Finished
                                </li>
                                <hr />
                                <li
                                    className={`p-2 rounded cursor-pointer ${
                                        selectedMenuItem === "menu5"
                                            ? "bg-gray-700"
                                            : ""
                                    }`}
                                    onClick={() => handleMenuItemClick("menu5")}
                                >
                                    <span className="pr-2">
                                        <FontAwesomeIcon icon={faPenToSquare} />{" "}
                                    </span>
                                    Create new contest
                                </li>
                                <hr />
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
