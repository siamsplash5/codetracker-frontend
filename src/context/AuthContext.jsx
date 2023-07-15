import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import apiConfig from "../config/apiConfig";

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
        } else {
            setCurrentUser(null);
        }
    }, [currentUser]);

    //register function
    async function register(email, username, password){
        try {
            const {data} = await axios.post(apiConfig.register, 
                {
                    email, 
                    username, 
                    password
                },
                {withCredentials: true}
            );
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    //verify function
    async function verify(otp) {
        try {
            const { data } = await axios.post(
                apiConfig.verifyRegistration,
                {
                    otp,
                },
                { withCredentials: true }
            );
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    // login function
    async function login(username, password) {
        try {
            const { data } = await axios.post(
                apiConfig.login,
                {
                    username,
                    password,
                },
                { withCredentials: true }
            );
            if (data.status === 200) {
                //setCurrentUser(username);
                //localStorage.setItem("currentUser", username);
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
            const username = localStorage.getItem('currentUser');
            const { data } = await axios.post(apiConfig.logout, {username}, { withCredentials: true });
            if(data.status===200 || data.status===401){
                setCurrentUser(null);
                localStorage.removeItem("currentUser");
            }
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    async function recoverPasswordRequest(username) {
        try {
            const { data } = await axios.post(
                apiConfig.passwordUpdate,
                { username },
                { withCredentials: true }
            );
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    async function updatePassword(otp, newPassword) {
        try {
            const { data } = await axios.post(
                apiConfig.passwordUpdateVerify,
                { otp, newPassword },
                { withCredentials: true }
            );
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    const value = {
        currentUser,
        login,
        logout,
        register,
        verify,
        recoverPasswordRequest,
        updatePassword
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
