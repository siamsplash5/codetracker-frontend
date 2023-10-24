import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import {
    RightToBrackedDefault,
    RotatingSpinner
} from "../../../components/Icons";
import { useAuth } from "../../../context/AuthContext";
import sleep from "../../../utils/sleep";

export default function verifyRegistration({ userInfo }) {
    const { verify, login } = useAuth();
    const [otp, setOTP] = useState("");
    const [isDisabled, setDisabled] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const navigate = useNavigate();

    const { username, password } = userInfo;

    const handleOTPChange = (e) => {
        setOTP(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setDisabled(true);
        const { status, message } = await verify(otp);
        if (status === 201) {
            const response = await login(userInfo);
            if (response.status === 200) {
                setOTP("");
                setErrorMsg("");
                navigate("/");
            } else {
                setErrorMsg("Something went wrong!");
            }
        } else {
            setErrorMsg("");
            await sleep(100);
            setErrorMsg(message);
            setShowErrorMsg(true);
        }
        setDisabled(false);
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
                href="#"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
                <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                CodeTracker
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <p>
                        A OTP has been sent to your email. The code will expires
                        in 1 hour. Enter the OTP here to complete the
                        registration.
                    </p>
                    <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <input
                                type="otp"
                                name="otp"
                                id="otp"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-buttons focus:border-buttons block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter the OTP"
                                required
                                value={otp}
                                onChange={handleOTPChange}
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
                            disabled={isDisabled}
                            className="w-full text-white bg-indigo-800 hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-buttons dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            {isDisabled ? (
                                <RotatingSpinner />
                            ) : (
                                <RightToBrackedDefault />
                            )}
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
