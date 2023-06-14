import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowSourceCode from "./ShowSourceCode";

export default function VerdictTable({ status, info }) {
    const [submissionList, setSubmissionList] = useState([]);
    const [showCode, setShowCode] = useState(false);
    const [indexToShow, setIndexToShow] = useState();
    const { judge, problemID } = info;
    const navigate = useNavigate();

    const handleRequestError = (error) => {
        console.log(error);
        navigate("/server-error");
    };

    const getSubmission = async () => {
        try {
            const { data } = await axios.get(
                `/api/submissiondata/specific-problem/${judge}/${problemID}`,
            );
            if (data.status === undefined) {
                setSubmissionList((prevList) => [...data, ...prevList]);
            }
        } catch (error) {
            handleRequestError(error);
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
                navigate("/server-error");
            }
        }
    }, [status]);

    useEffect(() => {
        if(showCode){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "scroll";
        }

        return () => {};
    }, [showCode]);

    return (
        <div className="overflow-x-auto mb-5">
            <table className="border border-gray-300 w-full">
                <thead>
                    <tr>
                        <th className="border-b px-4 py-2">Submission</th>
                        <th className="border-b px-4 py-2">Time</th>
                        <th className="border-b px-4 py-2">Verdict</th>
                    </tr>
                </thead>
                <tbody>
                    {submissionList.map((status, index) => (
                        <tr key={status._id}>
                            <td className="border-b px-4 py-2 text-center">
                                <button
                                    onClick={() => {
                                        setShowCode(true);
                                        setIndexToShow(index);
                                    }}
                                >
                                    {status.realJudgesSubmissionID}
                                </button>
                            </td>
                            <td className="border-b px-4 py-2 text-center">
                                {status.submitDate}
                                <br />
                                {status.submitTime}
                            </td>
                            <td
                                className={`border-b px-4 py-2 text-center ${
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
                <ShowSourceCode status={submissionList[indexToShow]} onClose={()=>setShowCode(false)} />
            )}
        </div>
    );
}
