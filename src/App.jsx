// importing from packages
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// importing components

import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyRegistration from "./pages/VerifyRegistration";

//import contexts
import {AuthProvider} from './context/AuthContext';


function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/verify-registration"
                        element={<VerifyRegistration />}
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
