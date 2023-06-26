import {
    faBullhorn,
    faCheck,
    faChevronRight,
    faClock,
    faList,
    faPaperPlane,
    faSquare,
    faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useSWR from "swr";
import { useAuth } from "../context/AuthContext";
import {
    Announcement,
    ContestDashboard,
    Standings,
    Submissions,
} from "../features/contests";
import { ProblemContainer } from "../features/problems";
import { SubmitSolution, VerdictTable } from "../features/submissions";
import calculateCountdown from "../utils/calculateCountdown";

const fetchProblemList = async ([url, problemSet]) => {
    const { data } = await axios.post(url, problemSet);
    if (data.status !== undefined) {
        console.log(data.message);
        return data.status.toString();
    }
    return data;
};

export default function ContestPage() {
    const [showServerError, setShowServerError] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [selectedProblem, setSelectedProblem] = useState(null);

    const [problemList, setProblemList] = useState([]);
    const [statusInfo, setStatusInfo] = useState();
    const location = useLocation();
    const [contest, setContest] = useState(location.state);
    const { currentUser } = useAuth();
    const [isRegistered, setIsRegistered] = useState(
        contest.registered.includes(currentUser)
    );
    const { problemSet } = contest;
    const { data, error } = useSWR(
        ["/api/contest-problem/all", problemSet],
        fetchProblemList,
        { suspense: true }
    );

    const [countdown, setCountdown] = useState(calculateCountdown());

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

    const contestSubmitHandler = async ({ langID, sourceCode }) => {
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
    };

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <>
            {showServerError && <ServerError />}
            {!showServerError && (
                <div>
                    {/* Div 1: Show only on mobile screens */}
                    <div className="block lg:hidden">
                        <div className="flex mx-0">
                            <div
                                className={`${
                                    isSidebarOpen ? "" : "hidden"
                                } w-full bg-slate-800 text-white text-opacity-80 h-screen`}
                            >
                                <div className="p-4">
                                    <h5 className="mb-4 text-xl text-center">
                                        {contest.title}
                                    </h5>
                                    <div className="flex items-center justify-center text-sm py-2">
                                        {contest.beginTime +
                                            contest.contestLength >
                                        Date.now() ? (
                                            <FontAwesomeIcon
                                                icon={faClock}
                                                className="text-gray-500 mr-2"
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="text-gray-500 mr-2"
                                            />
                                        )}
                                        <span className="text-xl">
                                            {contest.beginTime +
                                                contest.contestLength >
                                            Date.now()
                                                ? `Remaining: ${countdown}`
                                                : "Finished"}
                                        </span>
                                    </div>
                                    <hr />
                                    <ul className="space-y-2 mt-4">
                                        <li
                                            className={`mb-4 p-2 rounded cursor-pointer hover:text-white ${
                                                selectedMenuItem === "dashboard"
                                                    ? "bg-gray-700 text-white"
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                handleMenuItemClick(
                                                    "dashboard"
                                                );
                                                setSidebarOpen(false);
                                            }}
                                        >
                                            <span className="pr-2 text-indigo-300">
                                                <FontAwesomeIcon
                                                    icon={faList}
                                                />{" "}
                                            </span>{" "}
                                            Dashboard
                                        </li>
                                        <hr />
                                        {contest.beginTime <= Date.now() &&
                                            (contest.privacy !== "Private" ||
                                                (contest.privacy ===
                                                    "Private" &&
                                                    isRegistered)) && (
                                                <>
                                                    {problemList.map(
                                                        (problem) => (
                                                            <li
                                                                key={
                                                                    problem._id
                                                                }
                                                                className={`mb-4 p-2 rounded cursor-pointer hover:text-white ${
                                                                    selectedMenuItem ===
                                                                    problem._id
                                                                        ? "bg-gray-700 text-white"
                                                                        : ""
                                                                }`}
                                                                onClick={() => {
                                                                    handleMenuItemClick(
                                                                        problem._id
                                                                    );
                                                                    setSidebarOpen(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                <span className="pr-2 text-lg">
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faSquare
                                                                        }
                                                                    />{" "}
                                                                </span>{" "}
                                                                <span
                                                                    className={`${
                                                                        problem.title ===
                                                                        "Error!"
                                                                            ? "text-red-500"
                                                                            : null
                                                                    }`}
                                                                >
                                                                    {
                                                                        problem.title
                                                                    }
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                    <hr />
                                                    <li
                                                        className={`mb-4 p-2 rounded cursor-pointer hover:text-white ${
                                                            selectedMenuItem ===
                                                            "standings"
                                                                ? "bg-gray-700 text-white"
                                                                : ""
                                                        }`}
                                                        onClick={() => {
                                                            handleMenuItemClick(
                                                                "standings"
                                                            );
                                                            setSidebarOpen(
                                                                false
                                                            );
                                                        }}
                                                    >
                                                        <span className="pr-2 text-amber-400">
                                                            <FontAwesomeIcon
                                                                icon={faTrophy}
                                                            />{" "}
                                                        </span>{" "}
                                                        Standings
                                                    </li>
                                                    <li
                                                        className={`mb-4 p-2 rounded cursor-pointer hover:text-white ${
                                                            selectedMenuItem ===
                                                            "announcements"
                                                                ? "bg-gray-700 text-white"
                                                                : ""
                                                        }`}
                                                        onClick={() => {
                                                            handleMenuItemClick(
                                                                "announcements"
                                                            );
                                                            setSidebarOpen(
                                                                false
                                                            );
                                                        }}
                                                    >
                                                        <span className="pr-2 text-red-500">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faBullhorn
                                                                }
                                                            />{" "}
                                                        </span>{" "}
                                                        Announcements
                                                    </li>
                                                    <li
                                                        className={`mb-4 p-2 rounded cursor-pointer hover:text-white ${
                                                            selectedMenuItem ===
                                                            "submissions"
                                                                ? "bg-gray-700 text-white"
                                                                : ""
                                                        }`}
                                                        onClick={() => {
                                                            setSidebarOpen(
                                                                false
                                                            );
                                                            handleMenuItemClick(
                                                                "submissions"
                                                            );
                                                        }}
                                                    >
                                                        <span className="pr-2 text-green-400">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faPaperPlane
                                                                }
                                                            />{" "}
                                                        </span>{" "}
                                                        Submissions
                                                    </li>
                                                </>
                                            )}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex justify-start items-center h-screen">
                                <button
                                    className="bg-slate-800 text-white text-opacity-80 pr-1 pl-1 py-4 rounded-r-full"
                                    onClick={() =>
                                        setSidebarOpen(!isSidebarOpen)
                                    }
                                >
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </div>
                            <div className="overflow-y-auto">
                                <div
                                    className={`
                         ${isSidebarOpen ? "hidden" : "w-full m-0 p-0"}
                        overflow-y-auto max-h-screen`}
                                >
                                    {selectedMenuItem === "dashboard" && (
                                        <ContestDashboard
                                            contest={contest}
                                            onRegister={() =>
                                                setIsRegistered(true)
                                            }
                                        />
                                    )}
                                    {selectedMenuItem === "standings" && (
                                        <Standings />
                                    )}
                                    {selectedMenuItem === "announcements" && (
                                        <Announcement
                                            announcementList={
                                                contest.announcement
                                            }
                                        />
                                    )}
                                    {selectedMenuItem === "submissions" && (
                                        <Submissions
                                            contestID={contest.contestID}
                                        />
                                    )}
                                    {selectedProblem && (
                                        <ProblemContainer
                                            key={selectedProblem._id}
                                            problem={selectedProblem}
                                        />
                                    )}
                                </div>
                                <div>
                                    {selectedProblem &&
                                        (contest.privacy === "Public" ||
                                            (contest.privacy !== "Public" &&
                                                isRegistered)) && (
                                            <div
                                                className={` ${
                                                    isSidebarOpen
                                                        ? "hidden"
                                                        : "w-full m-0 p-0"
                                                } max-h-screen mt-4 overflow-auto`}
                                            >
                                                <SubmitSolution
                                                    handle={({
                                                        langID,
                                                        sourceCode,
                                                    }) =>
                                                        contestSubmitHandler({
                                                            langID,
                                                            sourceCode,
                                                        })
                                                    }
                                                    judge={
                                                        selectedProblem?.judge
                                                    }
                                                />
                                                <VerdictTable
                                                    status={statusInfo}
                                                    key={`verdict-key-${selectedProblem._id}`}
                                                    problemInfo={{
                                                        judge: selectedProblem?.judge,
                                                        problemID:
                                                            selectedProblem?.problemID,
                                                    }}
                                                    contestID={
                                                        contest.contestID
                                                    }
                                                />
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Div 2: Show only on large screens */}
                    <div className="hidden lg:block">
                        <div className="flex mx-0">
                            <div
                                className={`${
                                    isSidebarOpen ? "" : "hidden"
                                } w-2/12 bg-slate-800 text-white text-opacity-80 h-screen`}
                            >
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
                                                <FontAwesomeIcon
                                                    icon={faList}
                                                />{" "}
                                            </span>{" "}
                                            Dashboard
                                        </li>
                                        <hr />
                                        {contest.beginTime <= Date.now() &&
                                            (contest.privacy !== "Private" ||
                                                (contest.privacy ===
                                                    "Private" &&
                                                    isRegistered)) && (
                                                <>
                                                    {problemList.map(
                                                        (problem) => (
                                                            <li
                                                                key={
                                                                    problem._id
                                                                }
                                                                className={`mb-4 p-2 rounded cursor-pointer hover:text-white ${
                                                                    selectedMenuItem ===
                                                                    problem._id
                                                                        ? "bg-gray-700 text-white"
                                                                        : ""
                                                                }`}
                                                                onClick={() =>
                                                                    handleMenuItemClick(
                                                                        problem._id
                                                                    )
                                                                }
                                                            >
                                                                <span className="pr-2 text-lg">
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faSquare
                                                                        }
                                                                    />{" "}
                                                                </span>{" "}
                                                                <span
                                                                    className={`${
                                                                        problem.title ===
                                                                        "Error!"
                                                                            ? "text-red-500"
                                                                            : null
                                                                    }`}
                                                                >
                                                                    {
                                                                        problem.title
                                                                    }
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                    <hr />
                                                    <li
                                                        className={`mb-4 p-2 rounded cursor-pointer hover:text-white ${
                                                            selectedMenuItem ===
                                                            "standings"
                                                                ? "bg-gray-700 text-white"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            handleMenuItemClick(
                                                                "standings"
                                                            )
                                                        }
                                                    >
                                                        <span className="pr-2 text-amber-400">
                                                            <FontAwesomeIcon
                                                                icon={faTrophy}
                                                            />{" "}
                                                        </span>{" "}
                                                        Standings
                                                    </li>
                                                    <li
                                                        className={`mb-4 p-2 rounded cursor-pointer hover:text-white ${
                                                            selectedMenuItem ===
                                                            "announcements"
                                                                ? "bg-gray-700 text-white"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            handleMenuItemClick(
                                                                "announcements"
                                                            )
                                                        }
                                                    >
                                                        <span className="pr-2 text-red-500">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faBullhorn
                                                                }
                                                            />{" "}
                                                        </span>{" "}
                                                        Announcements
                                                    </li>
                                                    <li
                                                        className={`mb-4 p-2 rounded cursor-pointer hover:text-white ${
                                                            selectedMenuItem ===
                                                            "submissions"
                                                                ? "bg-gray-700 text-white"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            handleMenuItemClick(
                                                                "submissions"
                                                            )
                                                        }
                                                    >
                                                        <span className="pr-2 text-green-400">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faPaperPlane
                                                                }
                                                            />{" "}
                                                        </span>{" "}
                                                        Submissions
                                                    </li>
                                                </>
                                            )}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex justify-start items-center h-screen">
                                <button
                                    className="bg-slate-800 text-white text-opacity-80 pr-2 pl-1 py-6 rounded-r-full"
                                    onClick={() =>
                                        setSidebarOpen(!isSidebarOpen)
                                    }
                                >
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </div>
                            <div
                                className={`
                         ${
                             isSidebarOpen
                                 ? selectedProblem
                                     ? "w-7/12 p-3"
                                     : "w-10/12"
                                 : selectedProblem
                                 ? "w-9/12 p-3"
                                 : "w-full"
                         }
                        overflow-y-auto max-h-screen`}
                            >
                                {selectedMenuItem === "dashboard" && (
                                    <ContestDashboard
                                        contest={contest}
                                        onRegister={() => setIsRegistered(true)}
                                    />
                                )}
                                {selectedMenuItem === "standings" && (
                                    <Standings />
                                )}
                                {selectedMenuItem === "announcements" && (
                                    <Announcement
                                        announcementList={contest.announcement}
                                    />
                                )}
                                {selectedMenuItem === "submissions" && (
                                    <Submissions
                                        contestID={contest.contestID}
                                    />
                                )}
                                {selectedProblem && (
                                    <ProblemContainer
                                        key={selectedProblem._id}
                                        problem={selectedProblem}
                                    />
                                )}
                            </div>
                            {selectedProblem &&
                                (contest.privacy === "Public" ||
                                    (contest.privacy !== "Public" &&
                                        isRegistered)) && (
                                    <div className="w-3/12 ml-3 mr-6 max-h-screen mt-4">
                                        <div className="flex items-center justify-center bg-slate-800 text-gray-300 rounded px-2 mx-4 my-3 py-4">
                                            {contest.beginTime +
                                                contest.contestLength >
                                            Date.now() ? (
                                                <FontAwesomeIcon
                                                    icon={faClock}
                                                    className="mr-2"
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="mr-2"
                                                />
                                            )}
                                            <span className="text-xl">
                                                {contest.beginTime +
                                                    contest.contestLength >
                                                Date.now()
                                                    ? `Remaining: ${countdown}`
                                                    : "Finished"}
                                            </span>
                                        </div>
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
                                                problemID:
                                                    selectedProblem?.problemID,
                                            }}
                                            contestID={contest.contestID}
                                        />
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
