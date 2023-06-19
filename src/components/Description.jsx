import { useState } from "react";

export default function Description({value, onChange}) {
    const [description, setDescription] = useState("");
    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value;
        setDescription(newDescription);
        onChange(newDescription);
    };
    
    return (
        <>
            <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-700"
            >
                Description
            </label>
            <textarea
                id="description"
                name="description"
                maxLength={4000}
                value={description}
                placeholder="Write contest description"
                onChange={handleDescriptionChange}
                className="block h-32 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </>
    );
}
