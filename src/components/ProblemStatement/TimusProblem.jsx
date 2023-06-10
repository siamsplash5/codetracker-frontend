import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";

const StyledProblemStatement = styled.div`
    font-size: 1.2rem;
    hr {
        margin: 1rem;
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

    const {background, body, input, output} = problemStatement;

    console.log(sampleTestCase.outputs);

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

            {background && (
                <>
                    <h3>Background</h3>
                    <div className="mb-6">{ReactHtmlParser(background)}</div>
                </>
            )}
            {body && (
                <>
                    <div className="mb-6">{ReactHtmlParser(body)}</div>
                </>
            )}
            {input && (
                <>
                    <h3>Input</h3>
                    <div className="mb-6">{ReactHtmlParser(input)}</div>
                </>
            )}
            {output && (
                <>
                    <h3>Output</h3>
                    <div className="mb-6">{ReactHtmlParser(output)}</div>
                </>
            )}

            <hr />
            <br />

            {sampleTestCase.inputs.map((item, index) => (
                <>
                    {item && (
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
                                                                sampleTestCase
                                                                    .outputs[
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
                            <hr />
                        </>
                    )}
                    {notes && (
                        <>
                            <h3>Note</h3>
                            <div>{ReactHtmlParser(notes)}</div>
                        </>
                    )}
                </>
            ))}
        </StyledProblemStatement>
    );
}
