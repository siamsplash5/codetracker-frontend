import { useNavigate } from "react-router-dom";
import {
    LockedIconAmber,
    LockedIconRed,
    UnlockedIconGreen,
    UserIconDefault
} from "../../../components/Icons";
import millisecondToDayHourMinute from "../../../utils/millisecondToDayHourMinute";

export default function ({ heading, contestList }) {
    const navigate = useNavigate();
    const handleClick = (contest) => {
        navigate(`/contest/${contest.contestID}`, {state: contest});
    };
    return (
        <>
            {contestList && (
                <>
                    <h2 className="text-center mb-2 mt-2 md:mb-5">{heading}</h2>
                    <section className="dark:bg-gray-900 min-h-screen flex">
                        <div className="container mx-auto p-3 md:p-4">
                            <div className="overflow-x-auto text-center">
                                <table className="border border-gray-300 w-full overflow-x-scroll">
                                    <thead>
                                        <tr>
                                            <th className="border-b px-4 py-2">
                                                ID
                                            </th>
                                            <th className="border-b px-4 py-2">
                                                Title
                                            </th>
                                            <th className="border-b px-4 py-2">
                                                Registered
                                            </th>
                                            <th className="border-b px-4 py-2">
                                                Begin Time
                                            </th>
                                            <th className="border-b px-4 py-2">
                                                Length
                                            </th>
                                            <th className="border-b px-4 py-2">
                                                Owner
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contestList.map((contest, index) => (
                                            <tr
                                                key={contest._id}
                                                className={
                                                    index % 2 === 0
                                                        ? "bg-gray-50"
                                                        : "bg-white"
                                                }
                                            >
                                                <td className="border-b px-4 py-2">
                                                    <button
                                                        onClick={() =>
                                                            handleClick(contest)
                                                        }
                                                    >
                                                        #{contest.contestID}
                                                    </button>
                                                </td>
                                                <td className="border-b px-4 py-2 text-left">
                                                    <button
                                                        onClick={() =>
                                                            handleClick(contest)
                                                        }
                                                    >
                                                        {contest.privacy ===
                                                            "Protected" && (
                                                            <LockedIconAmber />
                                                        )}

                                                        {contest.privacy ===
                                                            "Private" && (
                                                            <LockedIconRed />
                                                        )}

                                                        {contest.privacy ===
                                                            "Public" && (
                                                            <UnlockedIconGreen />
                                                        )}
                                                        {contest.title}
                                                    </button>
                                                </td>
                                                <td className="border-b px-4 py-2">
                                                    <UserIconDefault />
                                                    x
                                                    {contest.registered.length}
                                                </td>
                                                <td className="border-b px-4 py-2">
                                                    {contest.startDate}
                                                    <br />
                                                    {contest.startTime}
                                                </td>
                                                <td className="border-b px-4 py-2">
                                                    {millisecondToDayHourMinute(
                                                        contest.contestLength
                                                    )}
                                                </td>
                                                <td className="border-b px-4 py-2 text-green-700">
                                                    <a
                                                        href={`/profile/${contest.owner}`}
                                                    >
                                                        <b>{contest.owner}</b>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </>
            )}
            {!contestList && <h1>No contest right now!</h1>}
        </>
    );
}
