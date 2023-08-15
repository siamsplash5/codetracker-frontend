import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import useSWR from "swr";
import NotFound from "../components/NotFound";
import ServerError from "../components/ServerError";
import apiEndPoints from "../config/apiConfig";
import { ProblemRecrawl, ProblemReport, ProblemContainer, ShowProblemInfo } from "../features/problems";
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
                        <div className="flex space-x-2">
                            <ProblemRecrawl />
                            <ProblemReport />
                        </div>
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
