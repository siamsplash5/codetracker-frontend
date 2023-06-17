import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
    ShowProblemInfo,
    AtcoderProblem,
    CodeforcesProblem,
    SpojProblem,
    TimusProblem
} from "../features/problems";

import { SubmitSolution, VerdictTable } from "../features/submissions"; 
import NotFound from "../components/NotFound";

const StyledProblemContainer = styled.div`
    font-family: Helvetica;
    width: 70%;
`;

const StyledSideBar = styled.div`
    width: 28.5%;
    height: 40%;
`;

const StyledGap = styled.div`
    width: 1.5%;
`;

export default function ProblemPage(props) {
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
                <div className="container flex mx-auto">
                    <StyledProblemContainer className="bg-slate-50">
                        {problem.judge === "Atcoder" && (
                            <AtcoderProblem problem={problem} />
                        )}
                        {problem.judge === "Codeforces" && (
                            <CodeforcesProblem problem={problem} />
                        )}
                        {problem.judge === "Timus" && (
                            <TimusProblem problem={problem} />
                        )}
                        {problem.judge === "Spoj" && (
                            <SpojProblem problem={problem} />
                        )}
                    </StyledProblemContainer>
                    <StyledGap />
                    <StyledSideBar>
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
                    </StyledSideBar>
                </div>
            )}
        </>
    );
}
