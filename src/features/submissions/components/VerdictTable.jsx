import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServerError from "../../../components/ServerError";
import ShowSourceCode from "./ShowSourceCode";

export default function VerdictTable({ status, problemInfo, contestID }) {
    const [submissionList, setSubmissionList] = useState([]);
    const [showServerError, setShowServerError] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [indexToShow, setIndexToShow] = useState();
    const { judge, problemID } = problemInfo;
    const navigate = useNavigate();

    const getSubmission = async () => {
        try {
            const { data } = await axios.get(
                `/api/submissions/specific-problem/${judge}/${problemID}/${
                    contestID || 0
                }`
            );
            if (data.status === undefined) {
                setSubmissionList((prevList) => [...data, ...prevList]);
            }
        } catch (error) {
            console.log(error);
            setShowServerError(true);
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        getSubmission();

        return () => {
            abortController.abort();
            setSubmissionList([]);
        };
    }, []);

    useEffect(() => {
        if (status !== undefined) {
            if (status.status === undefined) {
                setSubmissionList((prevList) => [status, ...prevList]);
            } else if (status.status === 401) {
                console.log(status.message);
                localStorage.removeItem("currentUser");
                navigate("/login");
                window.location.reload();
            } else {
                console.log(status.message);
                setShowServerError(true);
            }
        }
    }, [status]);

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
            {showServerError && <ServerError />}
            {!showServerError && (
                <div className="overflow-x-auto mb-5">
                    <table className="rounded w-full">
                        <thead>
                            <tr>
                                <th className="border-b text-sm px-1 py-1 md:px-4 md:py-2 md:text-base">
                                    Submission
                                </th>
                                <th className="border-b text-sm px-1 py-1 md:px-4 md:py-2 md:text-base">Time</th>
                                <th className="border-b text-sm px-1 py-1 md:px-4 md:py-2 md:text-base">Verdict</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissionList.map((status, index) => (
                                <tr key={status._id}>
                                    <td className="border-b text-sm px-1 py-1 md:px-4 md:py-2 md:text-base text-center">
                                        <button
                                            onClick={() => {
                                                setShowCode(true);
                                                setIndexToShow(index);
                                            }}
                                        >
                                            {status.realJudgesSubmissionID}
                                        </button>
                                    </td>
                                    <td className="border-b text-sm px-1 py-1 md:px-4 md:py-2 md:text-base text-center">
                                        {status.submitDate}
                                        <br />
                                        {status.submitTime}
                                    </td>
                                    <td
                                        className={`border-b text-sm px-1 py-1 md:px-4 md:py-2 md:text-base text-center ${
                                            status.verdict === "Accepted"
                                                ? "font-bold text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {status.verdict}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showCode && (
                        <ShowSourceCode
                            status={submissionList[indexToShow]}
                            onClose={() => setShowCode(false)}
                        />
                    )}
                </div>
            )}
        </>
    );
}
