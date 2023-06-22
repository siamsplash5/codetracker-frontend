import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import ServerError from "../components/ServerError";
import { ProblemContainer, ShowProblemInfo } from "../features/problems";
import { SubmitSolution, VerdictTable } from "../features/submissions";
import submitHandler from "../services/submitHandler";

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
                    const { data } = await axios.post("/api/problem", {
                        judge,
                        problemID,
                    });
                    if(data.status===undefined){
                        setProblem(data);
                    }else{
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

    return (
        <>
            {showServerError && <ServerError />}
            {showNotFound && <NotFound />}
            {!showNotFound && !showServerError  && problem && (
                <div className="container flex mx-auto mt-4">
                    <div className="w-9/12 mr-10">
                        <ProblemContainer problem={problem} />
                    </div>
                    <div className="w-3/12">
                        <ShowProblemInfo problem={problem} />
                        <SubmitSolution
                            handle={({ langID, sourceCode }) =>
                                submitHandler({
                                    problem,
                                    langID,
                                    sourceCode,
                                    setStatusInfo,
                                    setShowServerError,
                                })
                            }
                            judge={problem.judge}
                        />
                        <VerdictTable
                            status={statusInfo}
                            info={{
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
