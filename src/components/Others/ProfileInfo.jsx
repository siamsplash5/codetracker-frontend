import React from "react";
import Avatar from "../../assets/Avatar (Created with amongusavatarcreator.com).png";

const ProfileComponent = () => {
    // Dummy data for the profile
    const profileData = {
        username: "JohnDoe",
        totalSolves: 25,
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="md:flex md:items-center md:mb-6">
                <div className="md:flex-shrink-0 md:mr-4">
                    <img
                        src={Avatar}
                        alt="Profile"
                        className="h-32 w-32 rounded-md shadow-md border-4 border-white"
                    />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">
                        {profileData.username}
                    </h2>
                    <p className="text-gray-600">Software Engineer</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-200 rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold">Total Solves</h3>
                    <p className="text-gray-600 text-2xl">
                        {profileData.totalSolves}
                    </p>
                </div>
                <div className="bg-green-200 rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold">Points</h3>
                    <p className="text-gray-600 text-2xl">1500</p>
                </div>
                <div className="bg-zinc-200 rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold">Atcoder</h3>
                    <p className="text-gray-600 text-2xl">7</p>
                </div>
                <div className="bg-orange-200 rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold">Codeforces</h3>
                    <p className="text-gray-600 text-2xl">3</p>
                </div>
                <div className="bg-pink-200 rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold">SPOJ</h3>
                    <p className="text-gray-600 text-2xl">6</p>
                </div>
                <div className="bg-teal-200 rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold">Timus</h3>
                    <p className="text-gray-600 text-2xl">12</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;
