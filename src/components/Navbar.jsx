import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "./modals/Login.modal";
import axios from "axios";

export const Nav = styled.nav`
    .navbar-list {
        display: flex;
        gap: 4.8rem;
        li {
            list-style: none;
            .navbar-link {
                &.noUnderline {
                    text-decoration: none;
                }
                display: inline-block;
                text-decoration: none;
                text-transform: uppercase;
                color: ${({ theme }) => theme.colors.black};
                transition: color 0.3s linear;
                &:hover,
                &:active {
                    color: ${({ theme }) => theme.colors.helper};
                }
            }
        }
    }
`;

export default function Navbar() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [myUserName, setMyUserName] = useState("");

    useEffect(() => {
        // Check if user login data exists in localStorage
        const storedUserName = localStorage.getItem("username");
        if (storedUserName) {
            setIsLogin(true);
            setMyUserName(storedUserName);
        }
    }, []);

    const handleLoginClick = () => {
        setModalOpen(true);
    };

    const handleLogout = () => {
        const logout = async () => {
            try {
                const { data } = await axios.get("/api/logout");
                if (data === "SUCCESS") {
                   localStorage.removeItem("username");
                   setIsLogin(false);
                   setMyUserName("");
                }
                else{
                    alert(data);
                }
            } catch (error) {
                console.log(error);
                alert(error);
            }
        };
        logout();
    };

    return (
        <Nav>
            <div className="menuIcon">
                <ul className="navbar-list">
                    <li>
                        <NavLink className="navbar-link noUnderline" to="/">
                            Home
                        </NavLink>
                    </li>
                    {!isLogin && (
                        <>
                            <li>
                                <NavLink
                                    className="navbar-link noUnderline"
                                    to="/"
                                    onClick={handleLoginClick}
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="navbar-link noUnderline"
                                    to="/register"
                                >
                                    Register
                                </NavLink>
                            </li>
                        </>
                    )}
                    {isLogin && (
                        <>
                            <li>
                                <NavLink
                                    className="navbar-link noUnderline"
                                    to="/"
                                >
                                    {myUserName}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="navbar-link noUnderline"
                                    to="/"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            {isModalOpen && (
                <LoginModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    setUserName={(username) => {
                        setIsLogin(true);
                        setMyUserName(username);
                        localStorage.setItem("username", username); // Store username in localStorage
                    }}
                />
            )}
        </Nav>
    );
}
