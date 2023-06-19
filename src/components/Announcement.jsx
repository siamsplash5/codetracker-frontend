import { useState } from "react";

export default function Announcement({value, onChange}){
    const [announcement, setAnnouncement] = useState("");
    const handleAnnouncementChange = (e) => {
        const newAnnouncement = e.target.value;
        setDescription(newAnnouncement);
        onChange(newAnnouncement);
    };
    return (
        <>
            <label
                htmlFor="announcement"
                className="block mb-2 text-sm font-medium text-gray-700"
            >
                Announcement
            </label>
            <textarea
                id="announcement"
                name="announcement"
                maxLength={1000}
                value={announcement}
                placeholder="Write contest announcement"
                onChange={handleAnnouncementChange}
                className="block h-32 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </>
    );
}