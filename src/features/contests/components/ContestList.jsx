export default function ({ contestList }) {
    return (
        <section className="dark:bg-gray-900 min-h-screen flex">
            <div className="container mx-auto p-4">
                <div className="overflow-x-auto text-center">
                    <table className="border border-gray-300 w-full">
                        <thead>
                            <tr>
                                <th className="border-b px-4 py-2">
                                    ID
                                </th>
                                <th className="border-b px-4 py-2">Title</th>
                                <th className="border-b px-4 py-2">
                                    Total Participants
                                </th>
                                <th className="border-b px-4 py-2">
                                    Begin Time
                                </th>
                                <th className="border-b px-4 py-2">Length</th>
                                <th className="border-b px-4 py-2">Owner</th>
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
                                            onClick={() => {
                                                setShowCode(true);
                                                setIndexToShow(index);
                                            }}
                                        >
                                            #{contest.index}
                                        </button>
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        {contest.title}
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        <b>{null}</b>
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        {contest.startDate}
                                        <br />
                                        {contest.startTime}
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        {contest.duration}
                                    </td>
                                    <td className="border-b px-4 py-2 text-yellow-900">
                                        <a href={`/profile/${contest.owner}`}>
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
    );
}
