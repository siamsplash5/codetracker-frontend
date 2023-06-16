import React from "react";
import Avatar from "../../assets/Avatar (Created with amongusavatarcreator.com).png";

const ProfileComponent = ({profileData}) => {
    const { username, total, atcoder, codeforces, spoj, timus } = profileData; 
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
                    <h2 className="text-2xl font-bold">{username}</h2>
                    <p className="text-gray-600">Software Engineer</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 m-3">
                <div className="bg-blue-200 rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold">Total Solves</h3>
                    <p className="text-gray-600 text-2xl">{total}</p>
                </div>
                <div className="bg-green-200 rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold">Points</h3>
                    <p className="text-gray-600 text-2xl">1500</p>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 m-3">
                <div className="bg-zinc-200 rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold">Atcoder</h3>
                    <p className="text-gray-600 text-2xl">{atcoder}</p>
                </div>
                <div className="bg-orange-200 rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold">Codeforces</h3>
                    <p className="text-gray-600 text-2xl">{codeforces}</p>
                </div>
                <div className="bg-pink-200 rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold">SPOJ</h3>
                    <p className="text-gray-600 text-2xl">{spoj}</p>
                </div>
                <div className="bg-teal-200 rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold">Timus</h3>
                    <p className="text-gray-600 text-2xl">{timus}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;
