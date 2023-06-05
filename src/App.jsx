// importing from packages
import { BrowserRouter, Route, Routes } from "react-router-dom";

// importing components

import Navbar from "./components/Others/Navbar";
import ProblemPage from "./pages/ProblemPage";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PasswordRecover from "./pages/PasswordRecover";
import ProblemList from "./pages/ProblemList";
import Register from "./pages/Register";
import ServerError from "./pages/ServerError";
import SetNewPassword from "./pages/SetNewPassword";
import VerifyRegistration from "./pages/VerifyRegistration";

//import contexts
import { AuthProvider } from './context/AuthContext';


function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/problem" element={<ProblemList />} />
                    <Route path="/problem/:judge/:problemID" element={<ProblemPage />} />
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
