import { useState } from "react";

export default function ShowProblemInfo({problem}){
    const [show, setShow] = useState(false);
    const { tags, rating, source } = problem;
    
    return (
        <div className="container rounded-3xl mb-5 text-slate-50 bg-cyan-950 px-4 py-8">
            <button onClick={() => (show ? setShow(false) : setShow(true))}>
                {show ? "Hide Problem Info" : "Show Problem Info"}
            </button>
            {show && (
                <div>
                    <hr />
                    <br />
                    <div>
                        <p>
                            <span className="text-amber-300">Rating: </span>
                            <span>
                                <b>{rating}</b>
                            </span>
                        </p>
                        <p>
                            <span className="text-amber-300">Tags: </span>
                            {tags.map((element, index) => (
                                <li key={index}>{element}</li>
                            ))}
                        </p>
                        <p>
                            <span className="text-amber-300">Source: </span>{" "}
                            <a href={source}>Codeforces</a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}