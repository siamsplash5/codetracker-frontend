import React, { useEffect, useState } from "react";
import ShowSourceCode from "./ShowSourceCode";



export default function SubmissionList({ submissionList }) {
    const [showCode, setShowCode] = useState(false);
    const [indexToShow, setIndexToShow] = useState();

    useEffect(() => {
        if (showCode) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }

        return () => {};
    }, [showCode]);

    return (
        <>
            <h3 className=" text-center p-4">Submissions</h3>
            <section className="dark:bg-gray-900 min-h-screen flex">
                <div className="container mx-auto p-4">
                    <div className="overflow-x-auto text-center">
                        <table className="border border-gray-300 w-full">
                            <thead>
                                <tr>
                                    <th className="border-b px-4 py-2">
                                        Submission
                                    </th>
                                    <th className="border-b px-4 py-2">
                                        Judge
                                    </th>
                                    <th className="border-b px-4 py-2">
                                        Submitted
                                    </th>
                                    <th className="border-b px-4 py-2">User</th>
                                    <th className="border-b px-4 py-2">
                                        Problem
                                    </th>
                                    <th className="border-b px-4 py-2">
                                        Language
                                    </th>
                                    <th className="border-b px-4 py-2">
                                        Verdict
                                    </th>
                                    <th className="border-b px-4 py-2">Time</th>
                                    <th className="border-b px-4 py-2">
                                        Memory
                                    </th>
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
                                            <button
                                                onClick={() => {
                                                    setShowCode(true);
                                                    setIndexToShow(index);
                                                }}
                                            >
                                                {
                                                    submission.realJudgesSubmissionID
                                                }
                                            </button>
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            {submission.judge}
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            {submission.submitDate}
                                            <br />
                                            {submission.submitTime}
                                        </td>
                                        <td className="border-b px-4 py-2 text-green-700">
                                            <b>{submission.submittedBy}</b>
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            <a
                                                href={`/problem/${submission.judge}/${submission.problemID}`}
                                            >
                                                {submission.problemName}
                                            </a>
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            {submission.language}
                                        </td>
                                        <td
                                            className={`border-b px-4 py-2 text-center ${
                                                submission.verdict ===
                                                "Accepted"
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
            {showCode && (
                <ShowSourceCode
                    status={submissionList[indexToShow]}
                    onClose={() => setShowCode(false)}
                />
            )}
        </>
    );
}
