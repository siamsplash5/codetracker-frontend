import {
    faCalendarAlt, faList, faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import NotFound from "../components/NotFound";
import ServerError from "../components/ServerError";
import { ProfileInfo } from "../features/profiles";
import { filterSubmissionList, SubmissionList } from "../features/submissions";

const fetchSubmissionList = async (url) => {
    const { data } = await axios.get(url);
    if (data.status !== undefined) {
        console.log(data.message);
        return data.status.toString();
    }
    return data;
};

export default function ProfilePage() {
    const [selectedMenuItem, setSelectedMenuItem] = useState("menu1");
    const [showServerError, setShowServerError] = useState(false);
    const [showNotFound, setShowNotFound] = useState(false);
    const { username } = useParams();
    const { data, error } = useSWR(
        `/api/submissiondata/specific-user/${username}`,
        fetchSubmissionList,
        {
            suspense: true,
        }
    );

    useEffect(() => {
        if (data === "500") {
            setShowServerError(true);
            setShowNotFound(false);
        } else if (data === "404") {
            setShowServerError(false);
            setShowNotFound(true);
        } else {
            setShowServerError(false);
            setShowNotFound(false);
        }
    }, [data, error]);

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <>
            {showServerError && <ServerError />}
            {showNotFound && <NotFound />}
            {!showServerError && !showNotFound && (
                <div className="flex mx-10 mt-5">
                    <div className="w-4/5 overflow-y-auto max-h-screen pl-4">
                        <div className="p-4">
                            {selectedMenuItem === "menu1" && (
                                <ProfileInfo
                                    profileData={{
                                        username,
                                        ...filterSubmissionList(data),
                                    }}
                                />
                            )}
                            {selectedMenuItem === "menu2" && (
                                <SubmissionList submissionList={data} />
                            )}
                            {selectedMenuItem === "menu3" && (
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        Component 3
                                    </h1>
                                </div>
                            )}
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
                                    <FontAwesomeIcon icon={faUser} />{" "}
                                    {username ===
                                    localStorage.getItem("currentUser")
                                        ? "My profile"
                                        : `${username}'s profile`}
                                </li>
                                <li
                                    className={`p-2 rounded cursor-pointer ${
                                        selectedMenuItem === "menu2"
                                            ? "bg-gray-700"
                                            : ""
                                    }`}
                                    onClick={() => handleMenuItemClick("menu2")}
                                >
                                    <FontAwesomeIcon icon={faList} />{" "}
                                    {username ===
                                    localStorage.getItem("currentUser")
                                        ? "My submissions"
                                        : `${username}'s submissions`}
                                </li>
                                <li
                                    className={`p-2 rounded cursor-pointer ${
                                        selectedMenuItem === "menu3"
                                            ? "bg-gray-700"
                                            : ""
                                    }`}
                                    onClick={() => handleMenuItemClick("menu3")}
                                >
                                    <FontAwesomeIcon icon={faList} />{" "}
                                    {username ===
                                    localStorage.getItem("currentUser")
                                        ? "My contests"
                                        : `${username}'s contests`}
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
