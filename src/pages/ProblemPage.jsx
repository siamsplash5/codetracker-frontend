import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import NotFound from "../components/NotFound";
import ServerError from "../components/ServerError";
import apiEndPoints from "../config/apiConfig";
import { ProblemContainer, ShowProblemInfo } from "../features/problems";
import { SubmitSolution, VerdictTable } from "../features/submissions";

const fetchProblem = async ([url, object]) => {
    const { data } = await axios.post(url, object);
    return data;
};

export default function ProblemPage() {
    const [showNotFound, setShowNotFound] = useState(false);
    const [showServerError, setShowServerError] = useState(false);
    const [statusInfo, setStatusInfo] = useState();
    const { judge, problemID } = useParams();
    const navigate = useNavigate();
    const { data: problem, error } = useSWR([apiEndPoints.problem, {judge, problemID}], fetchProblem, {
        suspense: true,
    });

    if (error || problem.status!==undefined) {
        console.log(error);
        return <ServerError />;
    }

    async function submitHandler({ langID, sourceCode }) {
        try {
            const token = localStorage.getItem("JSESSIONID");
            const { data } = await axios.post(apiEndPoints.submit, {
                judge: problem.judge,
                problemID: problem.problemID,
                problemName: problem.title,
                langID,
                sourceCode,
                token
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

    return (
        <>
            {showServerError && <ServerError />}
            {showNotFound && <NotFound />}
            {!showNotFound && !showServerError && problem && (
                <div className="container flex-col lg:flex lg:flex-row mx-auto mt-4">
                    <div className="lg:w-9/12 lg:mr-4">
                        <ProblemContainer problem={problem} />
                    </div>
                    <div className="lg:w-3/12">
                        <ShowProblemInfo problem={problem} />
                        <SubmitSolution
                            handle={({ langID, sourceCode }) =>
                                submitHandler({
                                    langID,
                                    sourceCode,
                                })
                            }
                            judge={problem.judge}
                        />
                        <VerdictTable
                            status={statusInfo}
                            problemInfo={{
                                judge: problem.judge,
                                problemID: problem.problemID,
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
