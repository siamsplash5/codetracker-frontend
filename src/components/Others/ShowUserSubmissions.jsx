import axios from "axios";
import useSWR from "swr";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServerError from "../../pages/ServerError";

const fetchSubmissionList = async (url) => {
    const { data } = await axios.get(url);
    return data;
};

export default function SubmissionList({ username }) {
    const [submissionList, setSubmissionList] = useState([]);
    const navigate = useNavigate();
    const { data, error } = useSWR(
        `/api/submissiondata/specific-user/${username}`,
        fetchSubmissionList,
        {
            suspense: true,
        }
    );

    if (error) {
        console.log(error);
        return <ServerError />;
    }

    useEffect(() => {
        if (data && data.status === undefined) {
            setSubmissionList((prevList) => [...data, ...prevList]);
        } else {
            console.log(data.message);
            return <ServerError />;
        }
    }, []);

    return (
        <section className="dark:bg-gray-900 min-h-screen flex">
            <div className="container mx-auto p-4">
                <div className="overflow-x-auto text-center">
                    <table className="border border-gray-300 w-full">
                        <thead>
                            <tr>
                                <th className="border-b px-4 py-2">
                                    Submission
                                </th>
                                <th className="border-b px-4 py-2">Judge</th>
                                <th className="border-b px-4 py-2">
                                    Submitted
                                </th>
                                <th className="border-b px-4 py-2">User</th>
                                <th className="border-b px-4 py-2">Problem</th>
                                <th className="border-b px-4 py-2">Language</th>
                                <th className="border-b px-4 py-2">Verdict</th>
                                <th className="border-b px-4 py-2">Time</th>
                                <th className="border-b px-4 py-2">Memory</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissionList.map((submission, index) => (
                                <tr
                                    key={submission._id}
                                    className={
                                        index % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-white"
                                    }
                                >
                                    <td className="border-b px-4 py-2">
                                        {submission.realJudgesSubmissionID}
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        {submission.judge}
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        {submission.submitDate}
                                        <br />
                                        {submission.submitTime}
                                    </td>
                                    <td className="border-b px-4 py-2 text-yellow-900">
                                        <b>{submission.submittedBy}</b>
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        {submission.problemName}
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        {submission.language}
                                    </td>
                                    <td
                                        className={`border-b px-4 py-2 text-center ${
                                            submission.verdict === "Accepted"
                                                ? "font-bold text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {submission.verdict}
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        {submission.time}
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        {submission.memory}
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
