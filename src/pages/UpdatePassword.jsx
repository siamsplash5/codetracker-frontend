import { PasswordRecover, SetNewPassword } from "../features/password-update";

export default function UpdatePassword() {
    return (
        <>
            <PasswordRecover />
            <SetNewPassword />
        </>
    );
}
