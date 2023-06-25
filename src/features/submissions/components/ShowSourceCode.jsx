export default function ShowSourceCode({ status, onClose }) {
    const {
        submittedBy,
        judge,
        problemID,
        verdict,
        time,
        memory,
        language,
        submitDate,
        submitTime,
        sourceCode,
    } = status;
    return (
        <>
            <div className="justify-start items-start flex overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full my-6 mx-auto max-w-4xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-6 rounded-t">
                            <h3>
                                <span className="text-green-800">{`${submittedBy}`}</span>
                                {"'s source code "}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => onClose()}
                            >
                                X
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="border border-gray-300 w-full text-center">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="border-b px-4 py-2">
                                            Verdict
                                        </th>
                                        <th className="border-b px-4 py-2">
                                            Time
                                        </th>
                                        <th className="border-b px-4 py-2">
                                            Memory
                                        </th>
                                        <th className="border-b px-4 py-2">
                                            Language
                                        </th>
                                        <th className="border-b px-4 py-2">
                                            Submitted
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            className={`border-b px-4 py-2 text-center ${
                                                verdict === "Accepted"
                                                    ? "font-bold text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {verdict}
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            {time}
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            {memory}
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            {language}
                                        </td>
                                        <td className="border-b px-4 py-2">{`${submitDate} - ${submitTime}`}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="m-5 p-5 overflow-auto bg-slate-200">
                            <pre>{sourceCode}</pre>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
