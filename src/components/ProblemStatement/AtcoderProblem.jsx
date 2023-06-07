import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";

const StyledProblemStatement = styled.div`
    font-size: 1.2rem;
    h3 {
        font-weight: bold;
        font-size: 1.6rem;
        margin-bottom: 20px;
    }
    h4 {
        font-weight: 600;
        font-size: 1.3rem;
        margin-bottom: 20px;
    }
    .label-warning {
        color: white;
        font-size: 1rem;
        padding-left: 3px;
        padding-right: 3px;
        background-color: #e49400;
        border-radius: 5px;
    }

    .label-success {
        color: white;
        font-size: 1rem;
        padding-left: 3px;
        padding-right: 3px;
        background-color: #019901;
        border-radius: 5px;
    }
    code {
        color: #c7254e;
        background-color: #f9f2f4;
        border-radius: 3px;
    }
    section {
        display: block;
    }
    pre {
        display: block;
        padding: 9.5px;
        line-height: 1.42857143;
        word-break: break-all;
        word-wrap: break-word;
        color: #333;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 3px;
    }
    hr {
        margin-bottom: 20px;
    }
    ul {
        margin-bottom: 20px;
    }

    p {
        margin-bottom: 20px;
    }

    li {
        list-style: disc;
        padding-left: 20px;
        list-style-position: inside;
    }

    .mysample {
        display: block;
        font-family: monospace;
        white-space: pre;
    }
`;

export default function CodeforcesProblem({ problem }) {
    const {
        title,
        timeLimit,
        memoryLimit,
        problemStatement,
        sampleTestCase,
        notes,
    } = problem;

    return (
        <StyledProblemStatement className="px-4 py-8 rounded-lg bg-custom">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <hr />

            <p className="text-base">
                <span>
                    <b>Time Limit:</b> {timeLimit}
                </span>
                {" / "}
                <span>
                    <b>Memory Limit:</b> {memoryLimit}
                </span>
            </p>
            <hr />

            {problemStatement.body && (
                <div className="mb-6">
                    {ReactHtmlParser(problemStatement.body)}
                </div>
            )}

            {problemStatement.constraint && (
                <div className="mb-6">
                    {ReactHtmlParser(problemStatement.constraint)}
                </div>
            )}

            {problemStatement.input && (
                <div className="mb-6">
                    {ReactHtmlParser(problemStatement.input)}
                </div>
            )}

            {problemStatement.output && (
                <div className="mb-6">
                    {ReactHtmlParser(problemStatement.output)}
                </div>
            )}

            {sampleTestCase.inputs.map((item, index) => (
                <>
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
                                                <span className="mysample">
                                                    {item}
                                                </span>
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
                                                <span className="mysample">
                                                    {
                                                        sampleTestCase.outputs[
                                                            index
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <br />
                    {notes[index] && ReactHtmlParser(notes[index])}
                    <hr />
                </>
            ))}
        </StyledProblemStatement>
    );
}
