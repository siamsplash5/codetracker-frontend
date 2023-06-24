import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";

const StyledProblemStatement = styled.div`
    hr {
        margin-bottom: 20px;
    }
    ul {
        margin-bottom: 20px;
    }
    a {
        color: #3b82f6;
        text-decoration: underline;
    }
    img {
        margin: 1rem;
    }

    p {
        margin-bottom: 20px;
    }

    li {
        list-style: disc;
        padding-left: 20px;
        list-style-position: inside;
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
        <StyledProblemStatement className="px-4 py-8 rounded-lg">
            <h1 className="text-4xl font-bold mb-4 text-center">{title}</h1>
            <hr />

            <p className="text-base text-center">
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

            {problemStatement.interaction && (
                <div className="mb-6">
                    {ReactHtmlParser(problemStatement.interaction)}
                </div>
            )}

            {sampleTestCase.inputs.map((item, index) => (
                <div className="flex bg-white" key={`test-case-${index}`}>
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
                                            <pre>{item}</pre>
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
                                            <pre>
                                                {sampleTestCase.outputs[index]}
                                            </pre>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ))}
            <br />
            {notes && ReactHtmlParser(notes)}
        </StyledProblemStatement>
    );
}
