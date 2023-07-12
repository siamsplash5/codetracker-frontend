import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiConfig from "../config/apiConfig";
import NotFound from "../components/NotFound";
import ServerError from "../components/ServerError";
import { ProblemContainer, ShowProblemInfo } from "../features/problems";
import { SubmitSolution, VerdictTable } from "../features/submissions";

export default function ProblemPage() {
    const [statusInfo, setStatusInfo] = useState();
    const { judge, problemID } = useParams();
    const [showNotFound, setShowNotFound] = useState(false);
    const [showServerError, setShowServerError] = useState(false);
    const location = useLocation();
    const [problem, setProblem] = useState(location.state);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProblem() {
            if (!problem) {
                try {
                    const { data } = await axios.post(apiConfig.problem, {
                        judge,
                        problemID,
                    });
                    if (data.status === undefined) {
                        setProblem(data);
                    } else {
                        throw new Error(data.message);
                    }
                } catch (error) {
                    console.log(error);
                    setShowNotFound(true);
                }
            }
        }
        fetchProblem();
    }, [problem, judge, problemID]);

    async function submitHandler({ langID, sourceCode }) {
        try {
            const { data } = await axios.post(apiConfig.submit, {
                judge: problem.judge,
                problemID: problem.problemID,
                problemName: problem.title,
                langID,
                sourceCode,
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
