// importing from packages
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// importing components

import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import ContestListPage from "./pages/ContestListPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProblemListPage from "./pages/ProblemListPage";
import ProblemPage from "./pages/ProblemPage";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import UpdatePassword from "./pages/UpdatePassword";

//import contexts
import { AuthProvider } from './context/AuthContext';


function App() {
    return (
        <div className="bg-slate-100">
            <BrowserRouter>
                <AuthProvider>
                    <Navbar />
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/register"
                                element={<Registration />}
                            />
                            <Route
                                path="/problem"
                                element={<ProblemListPage />}
                            />
                            <Route
                                path="/contest"
                                element={<ContestListPage />}
                            />
                            <Route
                                path="/profile/:username"
                                element={<Profile />}
                            />
                            <Route
                                path="/problem/:judge/:problemID"
                                element={<ProblemPage />}
                            />
                            <Route
                                path="/forgot-password"
                                element={<UpdatePassword />}
                            />
                        </Routes>
                    </Suspense>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
