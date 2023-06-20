import {
    faBullhorn,
    faCode,
    faList,
    faSquare,
    faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { data } from "autoprefixer";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useSWR from "swr";

const fetchProblemList = async (...props) => {
    const { data } = await axios.post(...props);
    if (data.status !== undefined) {
        console.log(data.message);
        return data.status.toString();
    }
    return data;
};

export default function ContestPage() {
    const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");
    const [showServerError, setShowServerError] = useState(false);
    const [problemList, setProblemList] = useState([]);
    const location = useLocation();
    const [contest, setContest] = useState(location.state);
    const { problemSet } = contest;
    const [data, error] = useSWR(
        ["/api/problem/contest/all", problemSet],
        fetchProblemList,
        { suspense: true }
    );
    
    useEffect(() => {
        if (data === "500") {
            setShowServerError(true);
        } else {
            setProblemList(data);
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
                    <div className="w-4/5 overflow-y-auto max-h-screen pl-4 pr-4">
                        <div className="p-4">
                            {selectedMenuItem === "dashboard" && (
                                <div>
                                    <h3>This is dashboard</h3>
                                </div>
                            )}
                            {selectedMenuItem !== "dashboard" &&
                                selectedMenuItem !== "standings" &&
                                selectedMenuItem !== "announcements" && (
                                    <div>
                                        {selectedMenuItem}
                                    </div>
                                )}
                            {selectedMenuItem === "standings" && (
                                <div>
                                    <h3>This is standings</h3>
                                </div>
                            )}
                            {selectedMenuItem === "announcements" && (
                                <div>
                                    <h3>This is announcements</h3>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-1/5 bg-slate-800 text-white text-opacity-80 h-screen pr-4 ">
                        <div className="p-4">
                            <h5 className="mb-4">{contest.title}</h5>
                            <hr />
                            <ul className="space-y-2 mt-4">
                                <li
                                    className={`mb-4 p-2 rounded cursor-pointer hover:text-white ${
                                        selectedMenuItem === "dashboard"
                                            ? "bg-gray-700 text-white"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleMenuItemClick("dashboard")
                                    }
                                >
                                    <span className="pr-2 text-indigo-300">
                                        <FontAwesomeIcon icon={faList} />{" "}
                                    </span>{" "}
                                    Dashboard
                                </li>
                                <hr />
                                {problemSet.map((problem) => (
                                    <li
                                        key={problem._id}
                                        className={`mb-4 p-2 rounded cursor-pointer hover:text-white ${
                                            selectedMenuItem === problem._id
                                                ? "bg-gray-700 text-white"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleMenuItemClick(problem._id)
                                        }
                                    >
                                        <span className="pr-2 text-lg">
                                            <FontAwesomeIcon icon={faSquare} />{" "}
                                        </span>{" "}
                                        {problem.alias
                                            ? problem.alias
                                            : problem.problemID}
                                    </li>
                                ))}
                                <hr />
                                <li
                                    className={`mb-4 p-2 rounded cursor-pointer hover:text-white ${
                                        selectedMenuItem === "standings"
                                            ? "bg-gray-700 text-white"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleMenuItemClick("standings")
                                    }
                                >
                                    <span className="pr-2 text-amber-400">
                                        <FontAwesomeIcon icon={faTrophy} />{" "}
                                    </span>{" "}
                                    Standings
                                </li>
                                <li
                                    className={`mb-4 p-2 rounded cursor-pointer hover:text-white ${
                                        selectedMenuItem === "announcements"
                                            ? "bg-gray-700 text-white"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleMenuItemClick("announcements")
                                    }
                                >
                                    <span className="pr-2 text-red-500">
                                        <FontAwesomeIcon icon={faBullhorn} />{" "}
                                    </span>{" "}
                                    Announcements
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
