import styled from "styled-components";
import AtcoderProblem from "./AtcoderProblem";
import CodeforcesProblem from "./CodeforcesProblem";
import SpojProblem from "./SpojProblem";
import TimusProblem from "./TimusProblem";

export default function ProblemContainer({ problem }) {
    return (
        <div className="bg-white text-read problemFont">
            {problem.judge === "Atcoder" && (
                <AtcoderProblem problem={problem} />
            )}
            {problem.judge === "Codeforces" && (
                <CodeforcesProblem problem={problem} />
            )}
            {problem.judge === "Spoj" && <SpojProblem problem={problem} />}
            {problem.judge === "Timus" && <TimusProblem problem={problem} />}
        </div>
    );
}
