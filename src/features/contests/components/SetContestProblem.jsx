import { useState } from "react";

export default function SetContestProblem({ value, onChange }) {
    const [judge, setJudge] = useState();
    const [problemID, setProblemID] = useState();

    const handleJudgeChange = (e) => {
        const newJudge = e.target.value;
        setJudge(newJudge);
        onChange({judge, problemID});
    };
    const handleProblemIDChange = (e) => {
        const newProblemID = e.target.value;
        setJudge(newProblemID);
        onChange({judge, problemID});
    };

    return (
        <>
            <select
                id="judge"
                name="judge"
                value={judge}
                onChange={handleJudgeChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            >
                <option value="">Select an option</option>
                <option value="Atcoder">Atcoder</option>
                <option value="Codeforces">Codeforces</option>
                <option value="Spoj">Spoj</option>
                <option value="Timus">Timus</option>
            </select>
            <div key={index} className="mb-4 flex">
                <input
                    value={problemID}
                    onChange={handleProblemIDChange}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter the problem ID"
                    required
                />
            </div>
        </>
    );
}