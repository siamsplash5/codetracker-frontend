import { useState } from "react";
import { RegisterForm, VerifyRegistration } from "../features/registration";

export default function Registration(){
    const [showRegisterForm, setShowRegisterForm] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    return (
        <>
            {showRegisterForm && (
                <RegisterForm onClose={(userInfo) => {
                    setShowRegisterForm(false);
                    setUserInfo(userInfo);
                }} />
            )}
            {!showRegisterForm && <VerifyRegistration userInfo={userInfo} />}
        </>
    );
}