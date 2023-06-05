import axios from "axios";
import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SubmitSolution from "../components/Modals/SubmitSolution";
import ProblemInfoContent from "../components/ProblemInfoContent";
import { useNavigate } from "react-router-dom";


const StyledProblemContainer = styled.div`
    font-size: 1.2rem;
    hr {
        margin-bottom: 20px;
    }
    ul {
        margin-bottom: 20px;
    }

    .tex-font-style-it {
        font-style: italic;
    }

    .tex-font-style-tt {
        font-family: "Courier New", monospace;
        font-style: normal;
    }

    .tex-font-style-bf {
        font-weight: bold;
    }
    .tex-span {
        font-family: "times new roman", sans-serif;
        font-size: 1.5rem;
    }

    .tex-formula {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
    }

    .tex-font-style-bf {
        font-weight: bold;
    }

    .section-title {
        font-weight: bold;
        font-size: 1.6rem;
    }

    p {
        margin-bottom: 20px; /* Increase this value to adjust the gap */
    }

    li {
        list-style: disc;
        padding-left: 20px;
        list-style-position: inside;
    }
    width: 70%;
`;

const StyledSideBar = styled.div`
    width: 28%;
    height: 40%;
`;

const StyledGap = styled.div`
    width: 1.5%;
`;

export default function CodeforcesProblemPage(props) {
    const location = useLocation();
    const problem = location.state;
    const [show, setShow] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);

    const [submissionList, setSubmissionList] = useState([]);

    const navigate = useNavigate();

    async function submitHandler({langID, sourceCode}){
        try {
            console.log({
                judge: problem.judge,
                problemID: problem.problemID,
                langID,
                sourceCode,
            });
            const { data } = await axios.post("/api/submit", {
                judge: problem.judge,
                problemID: problem.problemID,
                langID,
                sourceCode,
            });
            console.log(data);
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
            <StyledProblemContainer className="px-4 py-8 rounded-lg bg-custom">
                <h1 className="text-4xl font-bold mb-4">{problem.title}</h1>
                <hr />
                <p className="text-base">
                    <span>
                        <b>Time Limit:</b> {problem.timeLimit}
                    </span>
                    {" / "}
                    <span>
                        <b>Memory Limit:</b> {problem.memoryLimit}
                    </span>
                </p>

                <hr />
                <div className="mb-6">
                    {ReactHtmlParser(problem.problemStatement.body)}
                </div>
                <div className="mb-6">
                    {ReactHtmlParser(problem.problemStatement.input)}
                </div>
                <div className="mb-6">
                    {ReactHtmlParser(problem.problemStatement.output)}
                </div>
                {problem.problemStatement.interaction && (
                    <div className="mb-6">
                        {ReactHtmlParser(problem.problemStatement.interaction)}
                    </div>
                )}
                {problem.sampleTestCase.inputs.map((item, index) => (
                    <div className="flex" key={`test-case-${index}`}>
                        <div className="flex-1">
                            <div className="h-full">
                                <table className="w-full h-full border border-gray-300">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 bg-gray-200">
                                                Input
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-4 py-2 align-top">
                                                <pre>{item}</pre>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="h-full">
                                <table className="w-full h-full border border-gray-300">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 bg-gray-200">
                                                Output
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-4 py-2 align-top">
                                                <pre>
                                                    {
                                                        problem.sampleTestCase
                                                            .outputs[index]
                                                    }
                                                </pre>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
                {problem.notes && ReactHtmlParser(problem.notes)}
            </StyledProblemContainer>

            <StyledGap />

            <StyledSideBar>
                <div className="container rounded-3xl text-white bg-cyan-950 px-4 py-8">
                    <button
                        onClick={() => (show ? setShow(false) : setShow(true))}
                    >
                        {show ? "Hide Problem Info" : "Show Problem Info"}
                    </button>
                    {show && (
                        <>
                            <hr />
                            <br />
                            <ProblemInfoContent problemInfo={problem} />
                        </>
                    )}
                </div>
                <br />
                <div>
                    <button
                        type="button"
                        className="w-full text-white bg-indigo-800 hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-buttons dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={() => setShowSubmitModal(true)}
                    >
                        submit
                    </button>
                    {showSubmitModal && (
                        <SubmitSolution
                            onClose={() => setShowSubmitModal(false)}
                            handle={({ langID, sourceCode }) =>
                                submitHandler({ langID, sourceCode })
                            }
                        />
                    )}
                </div>
                <br />
                <div className="overflow-x-auto">
                    <table className="border border-gray-300 w-full">
                        <thead>
                            <tr>
                                <th className="border-b px-4 py-2">
                                    Submission
                                </th>
                                <th className="border-b px-4 py-2">Time</th>
                                <th className="border-b px-4 py-2">Verdict</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissionList.map((status) => (
                                <tr key={status._id}>
                                    <td className="border-b px-4 py-2">
                                        {status.realJudgesSubmissionID}
                                    </td>
                                    <td className="border-b px-4 py-2 text-center">
                                        {status.submitDate}
                                        <br />
                                        {status.submitTime}
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        {status.verdict}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </StyledSideBar>
        </div>
    );
}
