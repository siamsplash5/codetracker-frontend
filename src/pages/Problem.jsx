import axios from "axios";
import React, { useState } from "react";

const YourPageComponent = () => {
    const [problemUrl, setProblemUrl] = useState("");
    const [problemList, setProblemList] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //special checking for only codeforces link
            let myUrl = problemUrl;
            console.log(myUrl);
            const cfRegex = /\/problemset\/problem\/(\d+)\/(\w+)/;
            const matches = myUrl.match(cfRegex);
            if (matches && matches.length === 3) {
                console.log("dukse");
                const contestID = matches[1];
                const problemIndex = matches[2];
                myUrl = `https://codeforces.com/contest/${contestID}/problem/${problemIndex.toUpperCase()}`;
            }

            const problemExists = problemList.some(
                (problem) => problem.source === myUrl
            );

            if (!problemExists) {
                const { data } = await axios.post("/api/problem", {
                    problemUrl: myUrl,
                });
                if(data.status===undefined){
                    setProblemList((prevList) => [data, ...prevList]);
                }
                else{
                    alert(data.message);
                }
            }
            setProblemUrl("");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <section className="bg-custom dark:bg-gray-900 min-h-screen flex">
            <div className="container mx-auto p-4">
                <form
                    onSubmit={handleSubmit}
                    className="mb-4 flex justify-center items-center"
                >
                    <label className="mr-2">Problem URL:</label>
                    <input
                        type="text"
                        value={problemUrl}
                        onChange={(e) => setProblemUrl(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-64"
                        placeholder="Enter the problem link"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-indigo-800 text-white py-2 px-4 rounded ml-2"
                    >
                        Submit
                    </button>
                </form>

                <div className="overflow-x-auto">
                    <table className="border border-gray-300 w-full">
                        <thead>
                            <tr>
                                <th className="border-b px-4 py-2">Judge</th>
                                <th className="border-b px-4 py-2">
                                    Problem ID
                                </th>
                                <th className="border-b px-4 py-2">
                                    Problem Title
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {problemList.map((problem) => (
                                <tr key={problem._id}>
                                    <td className="border-b px-4 py-2">
                                        {problem.judge}
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        {problem.problemID}
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        {problem.title}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default YourPageComponent;
