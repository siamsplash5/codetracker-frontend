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
            localStorage.setItem("uid", data.token);
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    //verify function
    async function verify(otp) {
        try {
            const token = localStorage.getItem("uid");
            const { data } = await axios.post(
                apiConfig.verifyRegistration,
                {
                    otp,
                    token
                },
                { withCredentials: true }
            );
            if(data.status===201){
                localStorage.removeItem("uid");
            }
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
                setCurrentUser(username);
                localStorage.setItem("currentUser", username);
                localStorage.setItem("JSESSIONID", data.token);
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
            const token = localStorage.getItem("JSESSIONID");
            const { data } = await axios.post(apiConfig.logout, {username, token}, { withCredentials: true });
            if(data.status===200 || data.status===401){
                setCurrentUser(null);
                localStorage.removeItem("currentUser");
                localStorage.removeItem("JSESSIONID");
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
            localStorage.setItem("uid", data.token);
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    async function updatePassword(otp, newPassword) {
        try {
            const token = localStorage.getItem("uid");
            const { data } = await axios.post(
                apiConfig.passwordUpdateVerify,
                { otp, newPassword, token },
                { withCredentials: true }
            );
            if(data.status===200){
                localStorage.removeItem("uid");
            }
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
