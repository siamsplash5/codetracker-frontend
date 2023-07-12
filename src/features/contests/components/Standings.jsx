import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import apiConfig from "../../../config/apiConfig";
import ServerError from "../../../components/ServerError";
import getProblemIndex from "../utils/getProblemIndex";
import getSubmissionStats from "../utils/getSubmissionStats";

const fetchStandings = async (url) => {
    const { data } = await axios.get(url);
    if (data.status !== undefined) {
        console.log(data.message);
        return data.status.toString();
    }
    return data;
};

export default function Standings({ contestID, totalProblem }) {
    const [showServerError, setShowServerError] = useState(false);
    const [totalAccepted, setTotalAccepted] = useState([]);
    const [totalSubmission, setTotalSubmission] = useState([]);
    const [ranklist, setRanklist] = useState([]);

    const { data, error } = useSWR(
        `${apiConfig.contestStandingByContestID}${contestID}`,
        fetchStandings,
        {
            suspense: true,
        }
    );

    useEffect(() => {
        if (data === "500") {
            setShowServerError(true);
        } else {
            setShowServerError(false);
            const {
                submission,
                accepted,
                ranklist: ranks,
            } = getSubmissionStats(data, totalProblem);
            setRanklist(ranks);
            setTotalSubmission(submission);
            setTotalAccepted(accepted);
        }
    }, [data, error]);

    return (
        <>
            {showServerError && <ServerError />}
            {!showServerError && (
                <>
                    <h3 className="text-center p-2 md:p-3 lg:p-4">Standings</h3>

                    <div className="mx-auto md:p-2 lg:p-4">
                        <div className="overflow-auto text-center">
                            <table className="border border-gray-300 w-full">
                                <thead>
                                    <tr>
                                        <th
                                            className="border-b border-l px-4 py-2"
                                            style={{ width: "1%" }}
                                            rowSpan="2"
                                        >
                                            Rank
                                        </th>
                                        <th
                                            className="border-b border-l px-4 py-2"
                                            style={{ width: "4%" }}
                                            rowSpan="2"
                                        >
                                            User
                                        </th>
                                        <th
                                            className="border-b border-l px-4 py-2"
                                            style={{ width: "1%" }}
                                            rowSpan="2"
                                        >
                                            Score
                                        </th>
                                        <th
                                            className="border-b border-l px-4 py-2"
                                            style={{ width: "4%" }}
                                            rowSpan="2"
                                        >
                                            Penalty
                                        </th>
                                        {[...Array(totalProblem)].map(
                                            (_, i) => (
                                                <th
                                                    key={i}
                                                    className="border-b px-4 py-2"
                                                >
                                                    {getProblemIndex(i)}
                                                </th>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        {[...Array(totalProblem)].map(
                                            (_, i) => (
                                                <td
                                                    key={i}
                                                    className="border-b px-4 py-2"
                                                >
                                                    {`${
                                                        totalAccepted[
                                                            getProblemIndex(i)
                                                        ]
                                                    } / ${
                                                        totalSubmission[
                                                            getProblemIndex(i)
                                                        ]
                                                    }`}
                                                </td>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {ranklist.map((user, index) => (
                                        <tr
                                            key={index}
                                            className={
                                                index % 2 == 0
                                                    ? "bg-gray-50"
                                                    : "bg-white"
                                            }
                                        >
                                            <td
                                                className="border-b px-4 py-2"
                                                style={{ width: "5%" }}
                                            >
                                                {index + 1}
                                            </td>
                                            <td
                                                className="border-b px-4 py-2"
                                                style={{ width: "5%" }}
                                            >
                                                {user.username}
                                            </td>
                                            <td
                                                className="border-b px-4 py-2"
                                                style={{ width: "5%" }}
                                            >
                                                {user.score}
                                            </td>
                                            <td
                                                className="border-b px-4 py-2"
                                                style={{ width: "5%" }}
                                            >
                                                {user.penalty}
                                            </td>
                                            {[...Array(totalProblem)].map(
                                                (_, i) => (
                                                    <td
                                                        key={i}
                                                        className={`border m-1 px-4 py-2 ${
                                                            user.problemStats[
                                                                getProblemIndex(
                                                                    i
                                                                )
                                                            ].isAccepted
                                                                ? "text-green-600"
                                                                : "text-red-500"
                                                        }`}
                                                    >
                                                        <b>
                                                            {
                                                            user.problemStats[getProblemIndex(i)].isAccepted
                                                                ? user.problemStats[getProblemIndex(i)].wrongSubmission
                                                                    ? `+${user.problemStats[getProblemIndex(i)].wrongSubmission}`
                                                                    : "+"
                                                                : user.problemStats[getProblemIndex(i)].wrongSubmission
                                                                ? `-${user.problemStats[getProblemIndex(i)].wrongSubmission}`
                                                                : null
                                                            }
                                                        </b>
                                                        <hr className={`${user.problemStats[getProblemIndex(i)].isAccepted ? null: 'hidden'}`} />
                                                        <b>
                                                            {
                                                            user.problemStats[getProblemIndex(i)].isAccepted
                                                                ? user.problemStats[getProblemIndex(i)].acceptedTimeInMinute: null
                                                            }
                                                        </b>
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
