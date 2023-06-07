import { useState } from "react";

export default function ShowProblemInfo({problem}){
    const [show, setShow] = useState(false);
    const { judge, tags, rating, source, score } = problem;
    
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
                        {rating && (
                            <p>
                                <span className="text-amber-300">Rating: </span>
                                <span>
                                    <b>{rating}</b>
                                </span>
                            </p>
                        )}
                        {score && (
                            <p>
                                <span className="text-amber-300">Score: </span>
                                <span>
                                    <b>{score}</b>
                                </span>
                            </p>
                        )}
                        {tags && (
                            <p>
                                <span className="text-amber-300">Tags: </span>
                                {tags.map((element, index) => (
                                    <li key={index}>{element}</li>
                                ))}
                            </p>
                        )}
                        {source && (
                            <p>
                                <span className="text-amber-300">Source: </span>{" "}
                                <a href={source} target="_blank">
                                    {judge}
                                </a>
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}