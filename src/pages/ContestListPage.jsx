import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
    faCalendarAlt,
    faFlagCheckered,
    faList,
    faLock,
    faLockOpen,
    faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import apiConfig from "../config/apiConfig";
import ServerError from "../components/ServerError";
import { useAuth } from "../context/AuthContext";
import {
    ContestList,
    CreateNewContest,
    filterContestList
} from "../features/contests";

const fetchContestList = async (url) => {
    const { data } = await axios.get(url);
    if (data.status !== undefined) {
        console.log(data.message);
        return data.status.toString();
    }
    return data;
};

export default function ContestListPage() {
    const [selectedMenuItem, setSelectedMenuItem] = useState("menu1");
    const [showServerError, setShowServerError] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { data, error } = useSWR(apiConfig.contestAll, fetchContestList, {
        suspense: true,
    });

    const {
        allContests,
        upcomingContests,
        runningContests,
        finishedContests,
        publicContests,
        privateContests,
        protectedContests,
    } = filterContestList(data);

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
                <div className="flex flex-col-reverse lg:flex-row lg:mx-10 lg:mt-5">
                    <div className="px-4 overflow-y-auto lg:w-4/5 lg:max-h-screen lg:pl-4">
                        <div className="p-1 md:p-4">
                            {selectedMenuItem === "menu1" && (
                                <ContestList
                                    heading="All contests"
                                    contestList={allContests}
                                />
                            )}
                            {selectedMenuItem === "menu2" && (
                                <ContestList
                                    heading="Upcoming contests"
                                    contestList={upcomingContests}
                                />
                            )}
                            {selectedMenuItem === "menu3" && (
                                <ContestList
                                    heading="Running contests"
                                    contestList={runningContests}
                                />
                            )}
                            {selectedMenuItem === "menu4" && (
                                <ContestList
                                    heading="Finished contests"
                                    contestList={finishedContests}
                                />
                            )}
                            {selectedMenuItem === "menu5" && (
                                <ContestList
                                    heading="Public contests"
                                    contestList={publicContests}
                                />
                            )}
                            {selectedMenuItem === "menu6" && (
                                <ContestList
                                    heading="Private contests"
                                    contestList={privateContests}
                                />
                            )}
                            {selectedMenuItem === "menu7" && (
                                <ContestList
                                    heading="Protected contests"
                                    contestList={protectedContests}
                                />
                            )}
                            <div className="md:p-4">
                                {selectedMenuItem === "menu8" &&
                                    (currentUser !== null ? (
                                        <CreateNewContest />
                                    ) : (
                                        navigate("/login")
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className=" bg-slate-800 text-white text-opacity-80 lg:w-1/5 lg:h-screen lg:pr-4 ">
                        <div className="p-4">
                            <ul className="flex justify-center flex-row lg:flex-col">
                                <div>
                                    <li
                                        className={`p-2 mb-2 rounded cursor-pointer hover:text-white ${
                                            selectedMenuItem === "menu1"
                                                ? "bg-gray-700 text-white"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleMenuItemClick("menu1")
                                        }
                                    >
                                        <span className="pr-2 text-indigo-300">
                                            <FontAwesomeIcon icon={faList} />{" "}
                                        </span>{" "}
                                        All contest
                                    </li>
                                    <li
                                        className={`p-2 mb-2 rounded cursor-pointer hover:text-white ${
                                            selectedMenuItem === "menu2"
                                                ? "bg-gray-700 text-white"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleMenuItemClick("menu2")
                                        }
                                    >
                                        <span className="pr-2 text-indigo-300">
                                            <FontAwesomeIcon
                                                icon={faCalendarAlt}
                                            />{" "}
                                        </span>
                                        Upcoming
                                    </li>
                                </div>
                                <div>
                                    <li
                                        className={`p-2 mb-2 rounded cursor-pointer hover:text-white ${
                                            selectedMenuItem === "menu3"
                                                ? "bg-gray-700 text-white"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleMenuItemClick("menu3")
                                        }
                                    >
                                        <span className="pr-2 text-indigo-300">
                                            <FontAwesomeIcon icon={faSpinner} />{" "}
                                        </span>
                                        Running
                                    </li>
                                    <li
                                        className={`p-2 mb-2 rounded cursor-pointer hover:text-white ${
                                            selectedMenuItem === "menu4"
                                                ? "bg-gray-700 text-white"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleMenuItemClick("menu4")
                                        }
                                    >
                                        <span className="pr-2 text-indigo-300">
                                            <FontAwesomeIcon
                                                icon={faFlagCheckered}
                                            />{" "}
                                        </span>
                                        Finished
                                    </li>
                                </div>
                                <div>
                                    <li
                                        className={`p-2 mb-2 rounded cursor-pointer hover:text-white ${
                                            selectedMenuItem === "menu5"
                                                ? "bg-gray-700 text-white"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleMenuItemClick("menu5")
                                        }
                                    >
                                        <span className="pr-2 text-green-500">
                                            <FontAwesomeIcon
                                                icon={faLockOpen}
                                            />{" "}
                                        </span>
                                        Public Contests
                                    </li>
                                    <li
                                        className={`p-2 mb-2 rounded cursor-pointer hover:text-white ${
                                            selectedMenuItem === "menu6"
                                                ? "bg-gray-700 text-white"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleMenuItemClick("menu6")
                                        }
                                    >
                                        <span className="pr-2 text-red-500">
                                            <FontAwesomeIcon icon={faLock} />{" "}
                                        </span>
                                        Private Contests
                                    </li>
                                </div>
                                <div>
                                    <li
                                        className={`p-2 mb-2 rounded cursor-pointer hover:text-white ${
                                            selectedMenuItem === "menu7"
                                                ? "bg-gray-700 text-white"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleMenuItemClick("menu7")
                                        }
                                    >
                                        <span className="pr-2 text-amber-500">
                                            <FontAwesomeIcon icon={faLock} />{" "}
                                        </span>
                                        Protected Contests
                                    </li>
                                    <hr />
                                    <li
                                        className={`p-2 mb-2 rounded cursor-pointer hover:text-white ${
                                            selectedMenuItem === "menu8"
                                                ? "bg-gray-700 text-white"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleMenuItemClick("menu8")
                                        }
                                    >
                                        <span className="pr-2 text-green-300">
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                            />{" "}
                                        </span>
                                        Create new contest
                                    </li>
                                    <hr />
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
