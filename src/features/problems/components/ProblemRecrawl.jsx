import { Tooltip } from "react-tooltip";
import { SyncIconDefault } from "../../../components/Icons";

export default function ProblemRecrawl(){
    return (
        <>
            <Tooltip anchorSelect="#recrawl" place="bottom">
                Re-fetch the problem statement
            </Tooltip>
            <button
                type="button"
                className="w-full text-white bg-green-700 mb-2 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                id="recrawl"
            >
                <SyncIconDefault /> Recrawl
            </button>
        </>
    );
}