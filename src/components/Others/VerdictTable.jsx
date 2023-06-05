export default function VerdictTable({ submissionList }) {
    return (
        <div className="overflow-x-auto mb-5">
            <table className="border border-gray-300 w-full">
                <thead>
                    <tr>
                        <th className="border-b px-4 py-2">Submission</th>
                        <th className="border-b px-4 py-2">Time</th>
                        <th className="border-b px-4 py-2">Verdict</th>
                    </tr>
                </thead>
                <tbody>
                    {submissionList.map((status) => (
                        <tr key={status._id}>
                            <td className="border-b px-4 py-2 text-center">
                                {status.realJudgesSubmissionID}
                            </td>
                            <td className="border-b px-4 py-2 text-center">
                                {status.submitDate}
                                <br />
                                {status.submitTime}
                            </td>
                            <td
                                className={`border-b px-4 py-2 text-center ${
                                    status.verdict === "Accepted"
                                        ? "font-bold text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {status.verdict}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}