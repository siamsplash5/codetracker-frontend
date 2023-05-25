import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function verifyRegistration() {
    const { recoverPasswordRequest } = useAuth();
    const [username, setUsername] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const data = await recoverPasswordRequest(username);
        if (data === "success") {
            setUsername("");
            navigate("/forgot-password-verify");
        } else {
            setErrorMsg(data);
            setShowErrorMsg(true);
        }
    }

    return (
        <section className="bg-custom dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img
                        className="w-8 h-8 mr-2"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo"
                    />
                    CodeTracker
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <p>
                           Enter your username:
                        </p>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <input
                                    type="username"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-buttons focus:border-buttons block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="ex. siamsplash5"
                                    required=""
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </div>
                            {showErrorMsg && (
                                <div className="flex items-center justify-between">
                                    <span className="text-sm ml-3 text-red-600">
                                        {errorMsg}
                                    </span>
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full text-white bg-indigo-800 hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-buttons dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Continue
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
