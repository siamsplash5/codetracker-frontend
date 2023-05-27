import React, { useState, useEffect } from "react";
import axios from "axios";

const YourPageComponent = () => {
    const [judge, setJudge] = useState("");
    const [problemUrl, setProblemUrl] = useState("");
    const [problemList, setProblemList] = useState([]);
    
    // const fetchProblemList = async () => {
    //     try {
    //         const response = await axios.get("/api/problems"); // Replace with your backend API endpoint
    //         setProblemList(response.data);
    //     } catch (error) {
    //         console.error("Error fetching problem list:", error);
    //     }
    // };

    // // Fetch the initial problem list from the backend when the page loads
    // useEffect(() => {
    //     fetchProblemList();
    // }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {data} = await axios.post("/api/problem", {
                judge,
                problemUrl,
            }); // Replace with your backend API endpoint
            console.log(data);
            // Update the problem list with the newly parsed problem
            setProblemList([...problemList, data]);

            // Reset the form inputs
            setJudge("");
            setProblemUrl("");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <section className="bg-custom dark:bg-gray-900 h-screen">
            <div className="container mx-auto">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="flex items-center mb-4">
                        <label className="mr-2">Problem URL:</label>
                        <input
                            type="text"
                            value={problemUrl}
                            onChange={(e) => setProblemUrl(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>

                <table className="border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border-b px-4 py-2">Judge</th>
                            <th className="border-b px-4 py-2">Problem ID</th>
                            <th className="border-b px-4 py-2">
                                Problem Title
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {problemList.map((problem) => (
                            <tr key={problem.problemID}>
                                <td className="border-b px-4 py-2">{judge}</td>
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
        </section>
    );
};

export default YourPageComponent;
