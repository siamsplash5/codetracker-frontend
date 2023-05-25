import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setCurrentUser(storedUser);
        }
    }, []);

    // login function
    async function login(username, password) {
        try {
            const { data } = await axios.post(
                "/api/login",
                {
                    username,
                    password,
                },
                { withCredentials: true }
            );
            if (data === "SUCCESS") {
                setCurrentUser(username);
                localStorage.setItem("currentUser", username);
            }
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    //logout function
    async function logout() {
        try {
            await axios.post("/api/logout", null, { withCredentials: true });
            setCurrentUser(null);
            localStorage.removeItem("currentUser");
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    const value = {
        currentUser,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
