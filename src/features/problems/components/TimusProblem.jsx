import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";

const StyledProblemStatement = styled.div`
    font-family: Times New Roman;
    font-size: 1.4rem;
    pre {
        font-size: 1.1rem;
    }
    hr {
        margin: 1rem;
    }
    a {
        color: #3b82f6;
        text-decoration: underline;
    }
    h3 {
        font-weight: bold;
        font-size: 1.6rem;
        margin-bottom: 1rem;
    }
    h4 {
        font-weight: 600;
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }

    ul {
        list-style: disc;
        padding-left: 20px;
        list-style-position: inside;
    }
    ol {
        list-style-type: decimal;
        padding-left: 20px;
        list-style-position: inside;
    }
    .spf {
        font-family: Helvetica;
    }
    .problem_par_normal {
        margin-bottom: 1rem;
    }
`;

export default function TimusProblem({ problem }) {
    const {
        title,
        timeLimit,
        memoryLimit,
        problemStatement,
        sampleTestCase,
        notes,
    } = problem;




    return (
        <StyledProblemStatement className="px-4 py-8 rounded-lg">
            <h1 className="text-4xl font-bold mb-4 spf text-center">{title}</h1>
            <hr />
            <p className="text-base spf text-center">
                <span>
                    <b>Time Limit:</b> {timeLimit}
                </span>
                {" / "}
                <span>
                    <b>Memory Limit:</b> {memoryLimit}
                </span>
            </p>
            <hr />

            {problemStatement.map((item, index) => (
                <div className="mb-6">{ReactHtmlParser(item)}</div>
            ))}

            <hr />
            <br />

            {sampleTestCase.inputs.map((item, index) => (
                <>
                    {item && (
                        <>
                            <div
                                key={index}
                                className="flex bg-white"
                                key={`test-case-${index}`}
                            >
                                <div className="flex-1 overflow-auto">
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
                                                        <span className="mysample">
                                                            {ReactHtmlParser(
                                                                item
                                                            )}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-auto">
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
                                                        <span className="mysample">
                                                            {ReactHtmlParser(
                                                                sampleTestCase
                                                                    .outputs[
                                                                    index
                                                                ]
                                                            )}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <hr />
                        </>
                    )}
                </>
            ))}
            {notes && notes.length > 0 && (
                <>
                    <h3>Note</h3>
                    {notes.map((item, index) => (
                        <div>{ReactHtmlParser(item)}</div>
                    ))}
                </>
            )}
        </StyledProblemStatement>
    );
}
