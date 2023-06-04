import styled from "styled-components";

const StyledContainer = styled.div``;

export default function ProblemInfoContent({ problemInfo }) {
    const { judge, timeLimit, memoryLimit, tags, rating, source } = problemInfo;
    return (
        <div>
            <p>
                <b>Rating:</b> {rating}
            </p>
            <p>
                <b> Tag:</b>{" "}
                {tags.map((element, index) => (
                    <span key={index}>{element + ", "}</span>
                ))}
            </p>
            <p>
                <b>Source:</b> <a href={source}>Codeforces</a>
            </p>
        </div>
    );
}
