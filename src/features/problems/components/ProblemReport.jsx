import { BugIconDefault } from "../../../components/Icons";

export default function ProblemReport(){
    return (
        <>
            <button
                type="button"
                className="w-full text-white bg-red-800 mb-2 hover:bg-red-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                id="report"
            >
                <BugIconDefault /> Report
            </button>
        </>
    );
}