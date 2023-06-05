import { useState } from "react";

export default function ShowProblemInfo({problem}){
    const [show, setShow] = useState(false);
    const { tags, rating, source } = problem;
    
    return (
        <div className="container rounded-3xl mb-5 text-white bg-cyan-950 px-4 py-8">
            <button onClick={() => (show ? setShow(false) : setShow(true))}>
                {show ? "Hide Problem Info" : "Show Problem Info"}
            </button>
            {show && (
                <>
                    <hr />
                    <br />
                    <div>
                        <p>
                            <b>Rating:</b> {rating}
                        </p>
                        <p>
                            <b> Tag:</b>{" "}
                            {tags.map((element, index) => (
                                <span key={index}>{element + ", "}</span>
                            ))}
                        </p>
                        <p>
                            <b>Source:</b> <a href={source}>Codeforces</a>
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}