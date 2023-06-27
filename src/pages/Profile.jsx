import { faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    const navigate = useNavigate();
    const { username } = useParams();
    const { data, error } = useSWR(
        `/api/submissions/specific-user/${username}`,
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
        } else if (data === "401") {
            setShowServerError(false);
            setShowNotFound(false);
            navigate('/login');
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
                <div className="flex flex-col-reverse lg:flex-row lg:mx-10 lg:mt-5">
                    <div className="overflow-y-auto max-h-screen lg:w-4/5 lg:pl-4">
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
                    <div className="bg-slate-800 text-white text-opacity-80 lg:h-screen lg:w-1/5 lg:pr-4">
                        <div className="p-1 lg:p-4">
                            <ul className="space-y-2">
                                <li
                                    className={`p-2 rounded cursor-pointer  ${
                                        selectedMenuItem === "menu1"
                                            ? "bg-gray-700"
                                            : ""
                                    }`}
                                    onClick={() => handleMenuItemClick("menu1")}
                                >
                                    <span className="pr-2 text-indigo-300">
                                        <FontAwesomeIcon icon={faUser} />{" "}
                                    </span>
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
                                    <span className="pr-2 text-indigo-300">
                                        <FontAwesomeIcon icon={faList} />{" "}
                                    </span>
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
                                    <span className="pr-2 text-indigo-300">
                                        <FontAwesomeIcon icon={faList} />{" "}
                                    </span>
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
