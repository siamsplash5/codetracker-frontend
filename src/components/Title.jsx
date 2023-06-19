import { useState } from "react";

export default function Title({value, onChange, titleFor}){
    const [title, setTitle] = useState("");
    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        onChange(newTitle);
    };
    return (
        <>
            <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-700"
            >
                Title
            </label>
            <input
                type="text"
                id="title"
                name="title"
                maxLength={100}
                value={title}
                placeholder={`${titleFor} title (max 100 characters)`}
                onChange={handleTitleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            />
        </>
    );
}