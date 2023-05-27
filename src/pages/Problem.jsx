import React, { useState, useEffect } from "react";
import axios from "axios";

const YourPageComponent = () => {
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
                problemUrl
            }); 
            console.log(data);
            if(data.status===undefined){
                setProblemList([...problemList, data]);
                setProblemUrl("");
            }
            else{
                alert(data.message);
            }
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
                        placeholder="Enter the problem link of Codeforces/Atcoder/SPOJ/Timus"
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
                                <tr key={problem.problemID}>
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
