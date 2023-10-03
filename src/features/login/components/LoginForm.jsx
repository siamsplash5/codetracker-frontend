import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import {
    RightToBrackedDefault,
    RotatingSpinner
} from "../../../components/Icons";
import { useAuth } from "../../../context/AuthContext";
import sleep from "../../../utils/sleep";

export default function () {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState({
        isErrorVisible: false,
        errorMessage: "",
    })
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitButtonDisabled(true);
        try {
            const { status, message } = await login(loginForm.username, loginForm.password);
            if (status === 200) {
                navigate("/");
                setLoginForm({
                    username: "",
                    password: "",
                })
            } else {
                setError({
                    ...error,
                    errorMessage: "",
                })
                await sleep(100); // to differenciate between new errors 
                setError({
                    isErrorVisible: true,
                    errorMessage: message,
                })
            }
        } catch (error) {
            alert(error);
        }
        setIsSubmitButtonDisabled(false);
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="/"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                    CodeTracker
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Log in to your account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-buttons focus:border-buttons block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="username"
                                    required
                                    value={loginForm.username}
                                    onChange={(e) => {
                                        setLoginForm({
                                            ...loginForm,
                                            username: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-buttons focus:border-buttons block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    value={loginForm.password}
                                    onChange={(e) => {
                                        setLoginForm({
                                            ...loginForm,
                                            password: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            {error.isErrorVisible && (
                                <div className="flex items-center justify-between">
                                    <span className="text-sm ml-3 text-red-600">
                                        {error.errorMessage}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-buttons dark:ring-offset-gray-800"
                                            required=""
                                        />
                                    </div>

                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-300"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="/forgot-password"
                                    className="text-sm font-medium text-buttons hover:underline dark:text-primary-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitButtonDisabled}
                                className="w-full text-white bg-indigo-800 hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-buttons dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {isSubmitButtonDisabled ? (
                                    <RotatingSpinner />
                                ) : (
                                    <RightToBrackedDefault />
                                )}
                                Continue
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <a
                                    href="register"
                                    className="font-medium text-buttons hover:underline dark:text-primary-500"
                                >
                                    Register
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
