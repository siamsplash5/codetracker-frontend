export default function PasswordComponent({onPasswordChange, onConfirmPasswordChange}){
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        onPasswordChange(password);
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);
        onConfirmPasswordChange(confirmPassword);
    };

    return (
        <div className="flex flex-row space-x-4">
            <div className="w-1/2 mb-4">
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="••••••••"
                    onChange={handlePasswordChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="w-1/2 mb-4">
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={confirmPassword}
                    placeholder="••••••••"
                    onChange={handleConfirmPasswordChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
        </div>
    );
}