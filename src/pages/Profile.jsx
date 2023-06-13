import React, { useState } from "react";
import ProblemList from "./ProblemList";
import ProfileInfo from "../components/Others/ProfileInfo";

const ProfilePage = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState("menu1");

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <div className="flex mx-10 mt-5">
            <div className="w-3/4 overflow-y-auto max-h-screen pl-4">
                <div className="p-4">
                    {selectedMenuItem === "menu1" && <ProfileInfo />}
                    {selectedMenuItem === "menu2" && <ProblemList />}
                    {selectedMenuItem === "menu3" && (
                        <div>
                            <h1 className="text-2xl font-bold">Component 3</h1>
                            {/* Content for Component 3 */}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-1/4 bg-gray-100 overflow-y-auto max-h-screen pr-4">
                <div className="p-4">
                    <ul className="space-y-2 text-center">
                        <li
                            className={`bg-gray-200 p-2 rounded cursor-pointer ${
                                selectedMenuItem === "menu1" && "bg-blue-200"
                            }`}
                            onClick={() => handleMenuItemClick("menu1")}
                        >
                            My Profile
                        </li>
                        <li
                            className={`bg-gray-200 p-2 rounded cursor-pointer ${
                                selectedMenuItem === "menu2" && "bg-blue-200"
                            }`}
                            onClick={() => handleMenuItemClick("menu2")}
                        >
                            My Submissions
                        </li>
                        <li
                            className={`bg-gray-200 p-2 rounded cursor-pointer ${
                                selectedMenuItem === "menu3" && "bg-blue-200"
                            }`}
                            onClick={() => handleMenuItemClick("menu3")}
                        >
                            My Contests
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
