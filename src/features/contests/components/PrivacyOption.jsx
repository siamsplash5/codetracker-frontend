import { useState } from "react";

export default function PrivacyOption({value, onChange}) {
    const [privacy, setPrivacy] = useState("");
    const handlePrivacyChange = (e)=>{
        const newPrivacy = e.target.value;
        setPrivacy(newPrivacy);
        onChange(newPrivacy);
    }
    return (
        <div className="mb-4">
            <label
                htmlFor="privacy"
                className="block mb-2 text-sm font-medium text-gray-700"
            >
                Privacy
            </label>
            <select
                id="privacy"
                name="privacy"
                value={privacy}
                onChange={handlePrivacyChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            >
                <option value="">Select an option</option>
                <option value="Public">
                    Public - any user can see and submit
                </option>
                <option value="Private">
                    Private - only user knowing contest password can see and
                    submit
                </option>
                <option value="Protected">
                    Protected - any user can see but only the user knowing
                    contest password can submit
                </option>
            </select>
        </div>
    );
}
