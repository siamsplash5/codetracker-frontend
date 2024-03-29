import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";

const StyledProblemStatement = styled.div`
    pre {
        font-size: 1.3rem;
        border: 1px solid black;
        padding: 1rem;
    }
    a {
        color: #3b82f6;
        text-decoration: underline;
    }
    pre b {
        font-size: 1.4rem;
    }
    hr {
        margin: 1rem;
    }
    p {
        margin-bottom: 1rem;
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
`;

export default function TimusProblem({ problem }) {
    const {
        title,
        timeLimit,
        memoryLimit,
        problemStatement,
    } = problem;

    return (
        <StyledProblemStatement className="px-4 py-8 rounded-lg overflow-auto">
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
            <div className="mb-6">{ReactHtmlParser(problemStatement)}</div>
            <hr />
        </StyledProblemStatement>
    );
}
