// importing from packages
import { BrowserRouter, Route, Routes } from "react-router-dom";

// importing components

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PasswordRecover from "./pages/PasswordRecover";
import SetNewPassword from "./pages/SetNewPassword";
import Register from "./pages/Register";
import VerifyRegistration from "./pages/VerifyRegistration";
import ProblemSearch from "./pages/Problem";
import ServerError from "./pages/ServerError";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Loading";
import CodeforcesProblemPage from "./pages/CodeforcesProblemPage"
import TimusProblemPage from "./pages/TimusProblemPage";
import AtcoderProblemPage from "./pages/AtcoderProblemPage";
import SpojProblemPage from "./pages/SpojProblemPage";

//import contexts
import { AuthProvider } from './context/AuthContext';
import Footer from "./components/Footer";


function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/problem" element={<ProblemSearch />} />
                    <Route path="/problem/codeforces/:problemID" element={<CodeforcesProblemPage />} />
                    <Route path="/problem/atocoder/:problemID" element={<AtcoderProblemPage />} />
                    <Route path="/problem/spoj/:problemID" element={<SpojProblemPage />} />
                    <Route path="/problem/timus/:problemID" element={<TimusProblemPage />} />
                    <Route
                        path="/forgot-password"
                        element={<PasswordRecover />}
                    />
                    <Route
                        path="/forgot-password-verify"
                        element={<SetNewPassword />}
                    />
                    <Route
                        path="/verify-registration"
                        element={<VerifyRegistration />}
                    />
                    <Route path="/server-error" element={<ServerError />} />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="/loading" element={<Loading />} />
                </Routes>
                {/* <Footer/> */}
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
