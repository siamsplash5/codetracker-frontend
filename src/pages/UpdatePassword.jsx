import { useState } from "react";
import { UsernameForm, NewPasswordForm } from "../features/password-update";

export default function UpdatePassword() {
    const [showUsernameForm, setShowUsernameForm] = useState(true);
    return (
        <>
            <div className="bg-slate-100">
                {showUsernameForm && (
                    <UsernameForm onClose={() => setShowUsernameForm(false)} />
                )}
                {!showUsernameForm && <NewPasswordForm />}
            </div>
        </>
    );
}
