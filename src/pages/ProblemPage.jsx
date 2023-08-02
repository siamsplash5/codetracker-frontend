import axios from "axios";
import React, { useEffect, useState } from "react";
// import { BugIconDefault, SyncIconDefault } from "../components/Icons";
import ReactConfetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";
import NotFound from "../components/NotFound";
import ServerError from "../components/ServerError";
import apiEndPoints from "../config/apiConfig";
import { ProblemContainer, ShowProblemInfo } from "../features/problems";
import { SubmitSolution, VerdictTable } from "../features/submissions";

const fetchProblem = async ([url, object]) => {
    const { data } = await axios.post(url, object);
    return data;
};

export default function ProblemPage() {
    const [showReactConfetti, setShowReactConfetti] = useState(false); 
    const [showNotFound, setShowNotFound] = useState(false);
    const [showServerError, setShowServerError] = useState(false);
    const [statusInfo, setStatusInfo] = useState();
    const { judge, problemID } = useParams();
    const navigate = useNavigate();
    const { data: problem, error } = useSWR([apiEndPoints.problem, {judge, problemID}], fetchProblem, {
        suspense: true,
    });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    if (error || problem.status!==undefined) {
        console.log(error);
        return <ServerError />;
    }

    useEffect(() => {
        if (showReactConfetti) {
            // Set a timeout to turn off the confetti after 3 seconds
            const timeoutId = setTimeout(() => {
                setShowReactConfetti(false);
            }, 10000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [showReactConfetti]);

    async function submitHandler({ langID, sourceCode }) {
        try {
            toast.success("Submitted! Please wait.", toastOptions);
            const token = localStorage.getItem("JSESSIONID");
            const { data } = await axios.post(apiEndPoints.submit, {
                judge: problem.judge,
                problemID: problem.problemID,
                problemName: problem.title,
                langID,
                sourceCode,
                token
            });
            if (data.status === undefined) {
                setStatusInfo(data);
                setShowServerError(false);
                if(data.verdict==='Accepted'){
                    toast.success(`${data.verdict}!`, toastOptions);
                    setShowReactConfetti(true);
                    
                }else{
                    toast.error(data.verdict, toastOptions);
                }
            } else {
                setShowServerError(true);
            }
        } catch (error) {
            console.log(error);
            setShowServerError(true);
        }
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
            />
            {showReactConfetti && (
                <ReactConfetti
                    height={window.height}
                    width={window.width}
                    numberOfPieces={500}
                    recycle={false}
                />
            )}
            {showServerError && <ServerError />}
            {showNotFound && <NotFound />}
            {!showNotFound && !showServerError && problem && (
                <div className="container flex-col lg:flex lg:flex-row mx-auto mt-4">
                    <div className="lg:w-9/12 lg:mr-4">
                        <ProblemContainer problem={problem} />
                    </div>
                    <div className="lg:w-3/12">
                        <ShowProblemInfo problem={problem} />
                        {/* <div className="container flex space-x-2">
                            <button
                                type="button"
                                className="w-full text-white bg-green-700 mb-2 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-buttons dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                               <SyncIconDefault /> Recrawl
                            </button>
                            <button
                                type="button"
                                className="w-full text-white bg-red-800 mb-2 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-buttons dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                               <BugIconDefault/> Report
                            </button>
                        </div> */}
                        <SubmitSolution
                            handle={({ langID, sourceCode }) =>
                                submitHandler({
                                    langID,
                                    sourceCode,
                                })
                            }
                            judge={problem.judge}
                        />
                        <VerdictTable
                            status={statusInfo}
                            problemInfo={{
                                judge: problem.judge,
                                problemID: problem.problemID,
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
