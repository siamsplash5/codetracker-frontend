import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faLock, faLockOpen, faPlus, faRightToBracket, faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function UnlockedIconGreen() {
    return (
        <span className="text-green-500 text-lg pr-2">
            <FontAwesomeIcon icon={faLockOpen} />{" "}
        </span>
    );
}

export function LockedIconRed() {
    return (
        <span className="text-red-500 text-lg pr-2">
            <FontAwesomeIcon icon={faLock} />{" "}
        </span>
    );
}

export function LockedIconAmber() {
    return (
        <span className="text-amber-500 text-lg pr-2">
            <FontAwesomeIcon icon={faLock} />{" "}
        </span>
    );
}

export function PenToSquareIconDefault() {
    return (
        <span className="pr-2">
            <FontAwesomeIcon icon={faPenToSquare} />{" "}
        </span>
    );
}

export function PlusIconDefault(){
    return (
        <span className="pr-2">
            <FontAwesomeIcon icon={faPlus} />{" "}
        </span>
    );
}

export function TrashIconDefault() {
    return (
        <span className="pr-2">
            <FontAwesomeIcon icon={faTrashAlt} />{" "}
        </span>
    );
}

export function UserIconDefault() {
    return (
        <span className="">
            <FontAwesomeIcon icon={faUser} />{" "}
        </span>
    );
}

export function RightToBrackedDefault(){
    return (
        <span className="pr-1">
            <FontAwesomeIcon icon={faRightToBracket} /> {" "}
        </span>
    );
}


export function RotatingSpinner(){
    return (
        <span className="pr-1">
            <FontAwesomeIcon icon={faSpinner} spin />{" "}
        </span>
    );
}

