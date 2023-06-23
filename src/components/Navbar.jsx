import React from "react";
import {
    faUserCircle,
    faHome,
    faList,
    faSignOutAlt,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import logo from "../assets/test.svg";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

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
                <div className="flex md:items-center justify-between py-4">
                    <div>
                        <a href="/" className="flex items-center">
                            <img
                                className="w-8 h-8 mr-2"
                                src={logo}
                                alt="logo"
                            />
                            <span className="text-lg font-semibold">
                                CodeTracker
                            </span>
                        </a>
                    </div>
                    <div>
                        <div className="text-right">
                            <button
                                className="hover:text-indigo-300 md:hidden"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <FontAwesomeIcon
                                    icon={faBars}
                                    className="mr-1 text-xl"
                                />
                            </button>
                        </div>
                        <div
                            className={`${!isOpen ? "hidden" : ""} md:block`}
                            id="navbar-default"
                        >
                            <ul className="flex flex-col items-center space-x-6 md:flex-row">
                                <li className="md:mb-0 mb-3">
                                    <a
                                        href="/"
                                        className="hover:text-indigo-300"
                                    >
                                        <FontAwesomeIcon
                                            icon={faHome}
                                            className="mr-1"
                                        />
                                        Home
                                    </a>
                                </li>
                                <li className="md:mb-0 mb-3">
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
                                <li className="md:mb-0 mb-3">
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
                                        <li className="md:mb-0 mb-3">
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
                                        <li className="md:mb-0 mb-3">
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
                                        <li className="md:mb-0 mb-3">
                                            <a
                                                href="/login"
                                                className="hover:text-indigo-300"
                                            >
                                                Login
                                            </a>
                                        </li>
                                        <li className="md:mb-0 mb-3">
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
            </div>
        </nav>
    );
}
