import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import ServerError from "../../../components/ServerError";
import apiEndPoints from "../../../config/apiConfig";
import changeCFUrl from "../utils/changeCFUrl";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchProblemList = async (...args) => {
    const { data } = await axios.get(...args);
    return data;
};

export default function () {
    const [problemFetchingUrl, setProblemFetchingUrl] = useState("");
    const [problemList, setProblemList] = useState([]);
    const [isLinkSubmitButtonDisabled, setIsLinkSubmitButtonDisabled] = useState(false);
    const navigate = useNavigate();

    const { data: allProblemList, error } = useSWR(apiEndPoints.problemAll, fetchProblemList, {
        suspense: true,
    });

    if (error) {
        console.log(error);
        return <ServerError />;
    }

    useEffect(() => {
        if (allProblemList && allProblemList.status === undefined) {
            setProblemList((prevList) => [...allProblemList, ...prevList]);
        } else {
            const errorMessage = allProblemList.message;
            console.log(errorMessage);
            return <ServerError />;
        }
    }, [allProblemList]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLinkSubmitButtonDisabled(true);

        const myUrl = changeCFUrl(problemFetchingUrl);

        // check for avoiding duplicate parsing
        const isProblemInCurrentList = problemList.some(
            (problem) => problem.source === myUrl
        );

        if (!isProblemInCurrentList) {
            const { data: newProblem } = await axios.post(apiEndPoints.problem, {
                problemFetchingUrl: myUrl,
            });

            if (error) {
                console.log(error);
                return <ServerError />;
            }

            if (newProblem.status === undefined) {
                // problem has come succesfully
                setProblemList((prevProblemList) => [newProblem, ...prevProblemList]);
            } else {
                const errorMessage = newProblem.message;
                toast.error(errorMessage, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
            }
        }
        setProblemFetchingUrl("");
        setIsLinkSubmitButtonDisabled(false);
    };

    const handleProblemClick = (problem) => {
        if (problem.judge === "Atcoder") {
            navigate(`/problem/atcoder/${problem.problemID}`, {
                state: problem,
            });
        } else if (problem.judge === "Codeforces") {
            navigate(`/problem/codeforces/${problem.problemID}`, {
                state: problem,
            });
        } else if (problem.judge === "Spoj") {
            navigate(`/problem/spoj/${problem.problemID}`, {
                state: problem,
            });
        } else if (problem.judge === "Timus") {
            navigate(`/problem/timus/${problem.problemID}`, {
                state: problem,
            });
        }
    };

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
            />
            <section className="dark:bg-gray-900 min-h-screen flex">
                <div className="container mx-auto p-4">
                    <div className="">
                        <form
                            onSubmit={handleSubmit}
                            className="mb-4 flex md:flex-row flex-col  justify-center items-center"
                        >
                            <div className="flex mb-2 md:mb-0">
                                <label className="mr-2">Problem URL:</label>
                                <input
                                    type="text"
                                    value={problemFetchingUrl}
                                    onChange={(e) =>
                                        setProblemFetchingUrl(e.target.value)
                                    }
                                    className="border border-gray-300 rounded px-2 py-1 w-64"
                                    placeholder="Enter the problem link"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-indigo-800 text-white py-2 px-4 rounded ml-2"
                                disabled={isLinkSubmitButtonDisabled}
                            >
                                {isLinkSubmitButtonDisabled ? (
                                    <>
                                        <FontAwesomeIcon
                                            icon={faRefresh}
                                            spin
                                        />{" "}
                                        Submitted
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="overflow-x-auto text-center">
                        <table className="border border-gray-300 w-full">
                            <thead className="">
                                <tr>
                                    <th className="border-b px-4 py-2">
                                        Judge
                                    </th>
                                    <th className="border-b px-4 py-2">
                                        Problem ID
                                    </th>
                                    <th className="border-b px-4 py-2">
                                        Problem Title
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {problemList.map((problem, index) => (
                                    <tr
                                        key={problem._id}
                                        className={
                                            index % 2 == 0
                                                ? "bg-gray-50"
                                                : "bg-white"
                                        }
                                    >
                                        <td className="border-b px-4 py-2">
                                            <button
                                                onClick={() =>
                                                    handleProblemClick(problem)
                                                }
                                                className="cursor-pointer"
                                            >
                                                {problem.judge}
                                            </button>
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            <button
                                                onClick={() =>
                                                    handleProblemClick(problem)
                                                }
                                                className="cursor-pointer"
                                            >
                                                {problem.problemID}
                                            </button>
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            <button
                                                onClick={() =>
                                                    handleProblemClick(problem)
                                                }
                                                className="cursor-pointer"
                                            >
                                                {problem.title}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
