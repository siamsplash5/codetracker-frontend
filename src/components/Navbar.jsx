import React from "react";
import {
    faUserCircle,
    faHome,
    faList,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import logo from "../assets/test.svg";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const { status, message } = await logout();
            if (status === 500) {
                navigate("/server-error");
            }
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    return (
        <nav className="bg-gray-800 text-gray-300">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <a href="/" className="flex items-center">
                        <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                        <span className="text-lg font-semibold">
                            CodeTracker
                        </span>
                    </a>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 ml-3 text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <div className="hidden md:block" id="navbar-default">
                        <ul className="flex items-center space-x-6">
                            <li>
                                <a href="/" className="hover:text-indigo-300">
                                    <FontAwesomeIcon
                                        icon={faHome}
                                        className="mr-1"
                                    />
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/problem"
                                    className="hover:text-indigo-300"
                                >
                                    <FontAwesomeIcon
                                        icon={faList}
                                        className="mr-1"
                                    />{" "}
                                    Problem
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contest"
                                    className="hover:text-indigo-300"
                                >
                                    <FontAwesomeIcon
                                        icon={faList}
                                        className="mr-1"
                                    />{" "}
                                    Contests
                                </a>
                            </li>
                            {currentUser ? (
                                <>
                                    <li className="relative group">
                                        <a
                                            href={`/profile/${currentUser}`}
                                            className="hover:text-indigo-300"
                                        >
                                            <span className="text-lg pr-1">
                                                <FontAwesomeIcon
                                                    icon={faUserCircle}
                                                />
                                            </span>
                                            {currentUser}
                                        </a>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="text-white bg-blue-500 px-4 py-2 rounded"
                                        >
                                            <FontAwesomeIcon
                                                icon={faSignOutAlt}
                                                className="mr-1"
                                            />
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <a
                                            href="/login"
                                            className="hover:text-indigo-300"
                                        >
                                            Login
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/register"
                                            className="hover:text-indigo-300"
                                        >
                                            Register
                                        </a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
