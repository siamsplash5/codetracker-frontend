import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import apiConfig from "../../../config/apiConfig";
import ServerError from "../../../components/ServerError";
import changeCFUrl from "../utils/changeCFUrl";

const fetchProblemList = async (...args) => {
    const { data } = await axios.get(...args);
    return data;
};

export default function() {
    const [problemUrl, setProblemUrl] = useState("");
    const [problemList, setProblemList] = useState([]);
    const navigate = useNavigate();

    const { data, error } = useSWR(apiConfig.problemAll, fetchProblemList, {
        suspense: true,
    });

    if (error) {
        console.log(error);
        return <ServerError />;
    }

    useEffect(() => {
        if (data && data.status === undefined) {
            setProblemList((prevList) => [...data, ...prevList]);
        } else {
            console.log(data.message);
            return <ServerError />;
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const myUrl = changeCFUrl(problemUrl);

        // check for avoiding duplicate parsing
        const problemExists = problemList.some(
            (problem) => problem.source === myUrl
        );

        if (!problemExists) {
            const { data } = await axios.post("/api/problem", {
                problemUrl: myUrl,
            });

            if (error) {
                console.log(error);
                return <ServerError />;
            }

            if (data.status === undefined) {
                setProblemList((prevList) => [data, ...prevList]);
            } else {
                alert(data.message);
            }
        }
        setProblemUrl("");
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
        <section className="dark:bg-gray-900 min-h-screen flex">
            <div className="container mx-auto p-4">
                <div className="">
                    <form
                        onSubmit={handleSubmit}
                        className="mb-4 flex md:flex-row flex-col  justify-center items-center"
                    >
                        <div className="flex mb-2 md:mb-0">
                            <label className="mr-2">
                                Problem URL:
                            </label>
                            <input
                                type="text"
                                value={problemUrl}
                                onChange={(e) => setProblemUrl(e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 w-64"
                                placeholder="Enter the problem link"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-800 text-white py-2 px-4 rounded ml-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                <div className="overflow-x-auto text-center">
                    <table className="border border-gray-300 w-full">
                        <thead className="">
                            <tr>
                                <th className="border-b px-4 py-2">Judge</th>
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
                                        {problem.judge}
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
    );
}
