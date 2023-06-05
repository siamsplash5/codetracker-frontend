import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ShowProblemInfo from "../components/Others/ShowProblemInfo";
import SubmitSolution from "../components/Others/SubmitSolution";
import VerdictTable from "../components/Others/VerdictTable";
import CodeforcesProblem from "../components/ProblemStatement/CodeforcesProblem";

const StyledProblemContainer = styled.div`
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
    const location = useLocation();
    const problem = location.state;

    const [submissionList, setSubmissionList] = useState([]);

    const navigate = useNavigate();

    async function submitHandler({langID, sourceCode}){
        try {
            const { data } = await axios.post("/api/submit", {
                judge: problem.judge,
                problemID: problem.problemID,
                langID,
                sourceCode,
            });
            
            if (data.status === undefined) {
                setSubmissionList((prevList) => [data, ...prevList]);
            } else {
                console.log(data.message);
                navigate("/server-error");
            }
        } catch (error) {
            console.log(error);
            navigate("/server-error");
        }
    }

    return (
        <div className="container flex mx-auto">
            <StyledProblemContainer>
                {problem.judge === "Codeforces" && (
                    <CodeforcesProblem problem={problem} />
                )}
            </StyledProblemContainer>
            <StyledGap />
            <StyledSideBar>
                <ShowProblemInfo problem={problem} />
                <SubmitSolution
                    handle={({ langID, sourceCode }) =>
                        submitHandler({ langID, sourceCode })
                    }
                />
                <VerdictTable submissionList={submissionList} />
            </StyledSideBar>
        </div>
    );
}
