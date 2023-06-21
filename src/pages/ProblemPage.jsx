import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import { ProblemContainer, ShowProblemInfo } from "../features/problems";
import { SubmitSolution, VerdictTable } from "../features/submissions";

export default function ProblemPage() {
    const [statusInfo, setStatusInfo] = useState();
    const { judge, problemID } = useParams();
    const [showNotFound, setShowNotFound] = useState(false);
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

    async function submitHandler({langID, sourceCode}){
        try {
            const { data } = await axios.post("/api/submit", {
                judge: problem.judge,
                problemID: problem.problemID,
                problemName: problem.title,
                langID,
                sourceCode,
            });
            setStatusInfo(data);
        } catch (error) {
            console.log(error);
            navigate("/server-error");
        }
    }

    return (
        <>
            {showNotFound && <NotFound />}
            {!showNotFound && problem && (
                <div className="container flex mx-auto mt-4">
                    <div className="w-9/12 mr-10">
                        <ProblemContainer problem={problem} />
                    </div>
                    <div className="w-3/12">
                        <ShowProblemInfo problem={problem} />
                        <SubmitSolution
                            handle={({ langID, sourceCode }) =>
                                submitHandler({ langID, sourceCode })
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
