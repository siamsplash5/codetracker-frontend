import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ShowProblemInfo from "../components/Others/ShowProblemInfo";
import SubmitSolution from "../components/Others/SubmitSolution";
import VerdictTable from "../components/Others/VerdictTable";
import AtcoderProblem from "../components/ProblemStatement/AtcoderProblem";
import CodeforcesProblem from "../components/ProblemStatement/CodeforcesProblem";
import TimusProblem from "../components/ProblemStatement/TimusProblem";

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
    const location = useLocation();
    const problem = location.state;
    const navigate = useNavigate();

    async function submitHandler({langID, sourceCode}){
        try {
            const { data } = await axios.post("/api/submit", {
                judge: problem.judge,
                problemID: problem.problemID,
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
        <div className="container flex mx-auto">
            <StyledProblemContainer>
                {problem.judge === "Atcoder" && (
                    <AtcoderProblem problem={problem} />
                )}
                {problem.judge === "Codeforces" && (
                    <CodeforcesProblem problem={problem} />
                )}
                {problem.judge === "Timus" && (
                    <TimusProblem problem={problem} />
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
    );
}
