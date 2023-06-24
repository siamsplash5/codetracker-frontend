import { useState } from "react";
import { PlusIconDefault, TrashIconDefault } from "../../../components/Icons";

export default function SetContestProblem({index, onChange, setTabs }) {
    const [judge, setJudge] = useState("");
    const [problemID, setProblemID] = useState("");
    const [alias, setAlias] = useState("");

    const handleJudgeChange = (e) => {
        const newJudge = e.target.value;
        setJudge(newJudge);
        setTabs((prevTabs) => {
            const updatedTabs = [...prevTabs];
            updatedTabs[index] = {
                judge: newJudge,
                problemID,
                alias
            };
            return updatedTabs;
        });
    };
    const handleProblemIDChange = (e) => {
        const newProblemID = e.target.value;
        setProblemID(newProblemID);
        setTabs((prevTabs) => {
            const updatedTabs = [...prevTabs];
            updatedTabs[index] = {
                judge,
                problemID: newProblemID,
                alias,
            };
            return updatedTabs;
        });
    };
    const handleAliasChange = (e) => {
        const newAlias = e.target.value;
        setAlias(newAlias);
        setTabs((prevTabs) => {
            const updatedTabs = [...prevTabs];
            updatedTabs[index] = {
                judge,
                problemID,
                alias: newAlias,
            };
            return updatedTabs;
        });
    };

    const handleDelete = () => {
        setTabs((prevTabs) => {
            const updatedTabs = [...prevTabs];
            updatedTabs[index] = null;
            return updatedTabs;
        });
    };

    return (
        <div className="mb-4 space-y-4 md:flex md:space-x-4">
            <div className="md:w-3/12">
                <select
                    id="judge"
                    name="judge"
                    value={judge}
                    onChange={handleJudgeChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                >
                    <option value="">Select Judge</option>
                    <option value="Atcoder">Atcoder</option>
                    <option value="Codeforces">Codeforces</option>
                    <option value="Spoj">Spoj</option>
                    <option value="Timus">Timus</option>
                </select>
            </div>
            <div className="md:w-3/12">
                <input
                    value={problemID}
                    onChange={handleProblemIDChange}
                    maxLength={50}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Problem ID"
                    required
                />
            </div>
            <div className="md:w-5/12">
                <input
                    value={alias}
                    onChange={handleAliasChange}
                    maxLength={100}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Alternate problem name to show"
                />
            </div>
            <div className="md:w-1/12 text-center">
                <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-red-800 rounded-md hover:bg-red-900 focus:outline-none focus:bg-red-900"
                >
                    <TrashIconDefault />
                </button>
            </div>
        </div>
    );
}
