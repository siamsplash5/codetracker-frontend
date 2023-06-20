import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import AtcoderOptions from "./AtcoderOptions";
import CodeforcesOptions from "./CodeforcesOptions";
import SpojOptions from "./SpojOptions";
import TimusOptions from "./TimusOptions";

export default function SubmitSolution({ handle, judge }) {
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [langID, setLangID] = useState(0);
    const [sourceCode, setSourceCode] = useState("");
    const navigate = useNavigate();
    const {currentUser} = useAuth();

    const handleLangIDChange = (event) => {
        setLangID(event.target.value);
    };

    const handleSourceCodeChange = (event) => {
        setSourceCode(event.target.value);
    };

    function handleSubmit() {
        if (currentUser === null) {
            navigate("/login");
        } else setShowSubmitModal(true);
    }

    async function handleSolutionSubmit(e) {
        e.preventDefault();
        handle({ langID, sourceCode });
        setLangID("");
        setSourceCode("");
        setShowSubmitModal(false);
    }

    useEffect(() => {
        if (showSubmitModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }

        return () => {};
    }, [showSubmitModal]);

    return (
        <div className="mb-5">
            <button
                type="button"
                className="w-full text-white bg-indigo-800 hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-buttons dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSubmit}
            >
                submit
            </button>
            {showSubmitModal && (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-full my-6 mx-auto max-w-4xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-6 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Submit Solution
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() =>
                                            setShowSubmitModal(false)
                                        }
                                    >
                                        X
                                    </button>
                                </div>

                                <form onSubmit={handleSolutionSubmit}>
                                    <div className="relative p-6 flex-auto">
                                        <div className="mb-6">
                                            <label
                                                className="block text-gray-700 text-lg font-bold mb-2"
                                                htmlFor="language"
                                            >
                                                Language
                                            </label>
                                            <select
                                                id="language"
                                                name="language"
                                                className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                                                onChange={handleLangIDChange}
                                                required
                                                defaultValue=""
                                            >
                                                {judge === "Atcoder" && (
                                                    <AtcoderOptions />
                                                )}
                                                {judge === "Codeforces" && (
                                                    <CodeforcesOptions />
                                                )}
                                                {judge === "Timus" && (
                                                    <TimusOptions />
                                                )}
                                                {judge === "Spoj" && (
                                                    <SpojOptions />
                                                )}
                                            </select>
                                        </div>
                                        <div className="mb-6">
                                            <label
                                                className="block text-gray-700 text-lg font-bold mb-2"
                                                htmlFor="solution"
                                            >
                                                Solution
                                            </label>
                                            <textarea
                                                id="solution"
                                                name="solution"
                                                className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                                                rows={10}
                                                onChange={
                                                    handleSourceCodeChange
                                                }
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-3 text-lg outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() =>
                                                setShowSubmitModal(false)
                                            }
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </div>
    );
}
