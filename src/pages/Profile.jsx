import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import ProfileInfo from "../components/Others/ProfileInfo";
import SubmissionList from "../components/Others/SubmissionList";
import NotFound from "./NotFound";
import ServerError from "./ServerError";

const fetchSubmissionList = async (url) => {
    const { data } = await axios.get(url);
    if (data.status !== undefined) {
        console.log(data.message);
        return data.status.toString();
    }
    return data;
};

const filterData = (data) => {
    const atc = new Set();
    const cf = new Set();
    const sp = new Set();
    const tim = new Set();

    let total = 0;
    let atcoder = 0;
    let codeforces = 0;
    let spoj = 0;
    let timus = 0;

    for (const obj of data) {
        if (obj.verdict === "Accepted") {
            if (obj.judge === "Atcoder" && !atc.has(obj.problemID)) {
                atcoder++;
                atc.add(obj.problemID);
            }
            if (obj.judge === "Codeforces" && !cf.has(obj.problemID)) {
                codeforces++;
                cf.add(obj.problemID);
            }
            if (obj.judge === "Spoj" && !sp.has(obj.problemID)) {
                spoj++;
                sp.add(obj.problemID);
            }
            if (obj.judge === "Timus" && !tim.has(obj.problemID)) {
                timus++;
                tim.add(obj.problemID);
            }
        }
    }
    total = atcoder + codeforces + spoj + timus;
    return {
        total,
        atcoder,
        codeforces,
        spoj,
        timus,
    };
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
                    <div className="w-3/4 overflow-y-auto max-h-screen pl-4">
                        <div className="p-4">
                            {selectedMenuItem === "menu1" && (
                                <ProfileInfo
                                    profileData={{
                                        username,
                                        ...filterData(data),
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
                    <div className="w-1/4 bg-gray-100 overflow-y-auto max-h-screen pr-4">
                        <div className="p-4">
                            <ul className="space-y-2 text-center">
                                <li
                                    className={`p-2 rounded cursor-pointer ${
                                        selectedMenuItem === "menu1"
                                            ? "bg-blue-200"
                                            : "bg-gray-200"
                                    }`}
                                    onClick={() => handleMenuItemClick("menu1")}
                                >
                                    {username ===
                                    localStorage.getItem("currentUser")
                                        ? "My profile"
                                        : `${username}'s profile`}
                                </li>
                                <li
                                    className={`p-2 rounded cursor-pointer ${
                                        selectedMenuItem === "menu2"
                                            ? "bg-blue-200"
                                            : "bg-gray-200"
                                    }`}
                                    onClick={() => handleMenuItemClick("menu2")}
                                >
                                    {username ===
                                    localStorage.getItem("currentUser")
                                        ? "My submissions"
                                        : `${username}'s submissions`}
                                </li>
                                <li
                                    className={`bg-gray-200 p-2 rounded cursor-pointer ${
                                        selectedMenuItem === "menu3"
                                            ? "bg-blue-200"
                                            : "bg-gray-200"
                                    }`}
                                    onClick={() => handleMenuItemClick("menu3")}
                                >
                                    {username ===
                                    localStorage.getItem("currentUser")
                                        ? "My contests"
                                        : `${username}'s contests`}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
