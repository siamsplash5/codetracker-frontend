import {
    faBullhorn,
    faList,
    faPaperPlane, faSquare,
    faTrophy
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useSWR from "swr";
import { Announcement, Dashboard, Standings, Submissions } from "../features/contests";
import { ProblemContainer } from "../features/problems";
import { SubmitSolution, VerdictTable } from "../features/submissions";

const fetchProblemList = async ([url, problemSet]) => {
    const { data } = await axios.post(url, problemSet);
    if (data.status !== undefined) {
        console.log(data.message);
        return data.status.toString();
    }
    return data;
};

export default function ContestPage() {
    const [statusInfo, setStatusInfo] = useState();
    const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");
    const [showServerError, setShowServerError] = useState(false);
    const [problemList, setProblemList] = useState([]);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const location = useLocation();
    const [contest, setContest] = useState(location.state);
    const { problemSet } = contest;
    const { data, error } = useSWR(
        ["/api/contest-problem/all", problemSet],
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

    useEffect(() => {
        if (
            selectedMenuItem !== "dashboard" &&
            selectedMenuItem !== "standings" &&
            selectedMenuItem !== "announcements" &&
            selectedMenuItem !== "submissions"
        ) {
            setSelectedProblem(
                problemList.find((problem) => problem._id === selectedMenuItem)
            );
        } else {
            setSelectedProblem(null);
        }
    }, [selectedMenuItem, problemList]);

    const contestSubmitHandler = async({langID, sourceCode})=>{
        try {
            const { data } = await axios.post("/api/submit", {
                judge: selectedProblem.judge,
                problemID: selectedProblem.problemID,
                problemName: selectedProblem.title,
                langID,
                sourceCode,
                vjContest: {
                    contestID: contest.contestID,
                    beginTime: contest.beginTime,
                    contestLength: contest.contestLength,
                },
            });
            if (data.status === undefined) {
                setStatusInfo(data);
                setShowServerError(false);
            } else {
                setShowServerError(true);
            }
        } catch (error) {
            console.log(error);
            setShowServerError(true);
        }
    }

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <>
            {showServerError && <ServerError />}
            {!showServerError && (
                <div className="flex mx-0">
                    <div className="w-2/12 bg-slate-800 text-white text-opacity-80 h-screen">
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
                                {problemList.map((problem) => (
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
                                        <span
                                            className={`${
                                                problem.title === "Error!"
                                                    ? "text-red-500"
                                                    : null
                                            }`}
                                        >
                                            {problem.title}
                                        </span>
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
                                <li
                                    className={`mb-4 p-2 rounded cursor-pointer hover:text-white ${
                                        selectedMenuItem === "submissions"
                                            ? "bg-gray-700 text-white"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleMenuItemClick("submissions")
                                    }
                                >
                                    <span className="pr-2 text-green-400">
                                        <FontAwesomeIcon icon={faPaperPlane} />{" "}
                                    </span>{" "}
                                    Submissions
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-7/12 overflow-y-auto max-h-screen">
                        <div className="p-4">
                            {selectedMenuItem === "dashboard" && <Dashboard />}
                            {selectedProblem && (
                                <ProblemContainer
                                    key={selectedProblem._id}
                                    problem={selectedProblem}
                                />
                            )}
                            {selectedMenuItem === "standings" && <Standings />}
                            {selectedMenuItem === "announcements" && (
                                <Announcement announcementList={contest.announcement} />
                            )}
                            {selectedMenuItem === "submissions" && (
                                <Submissions contestID={contest.contestID}/>
                            )}
                        </div>
                    </div>
                    <div className="w-3/12 ml-3 mr-6 max-h-screen mt-4">
                        {selectedProblem && (
                            <>
                                <SubmitSolution
                                    handle={({ langID, sourceCode }) =>
                                        contestSubmitHandler({
                                            langID,
                                            sourceCode,
                                        })
                                    }
                                    judge={selectedProblem?.judge}
                                />
                                <VerdictTable
                                    status={statusInfo}
                                    key={`verdict-key-${selectedProblem._id}`}
                                    problemInfo={{
                                        judge: selectedProblem?.judge,
                                        problemID: selectedProblem?.problemID,
                                    }}
                                    contestID={contest.contestID}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
