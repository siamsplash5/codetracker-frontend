import { useState } from "react";
import ReactHtmlParser from "react-html-parser";

export default function ShowProblemInfo({problem}){
    const [show, setShow] = useState(false);
    const { sourceLimit, judge, tags, rating, source, score, difficulty, author } = problem;
    console.log(tags);
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
                        {sourceLimit && (
                            <p>
                                <span className="text-amber-300">
                                    Source Limit: {" "}
                                </span>
                                {sourceLimit}
                            </p>
                        )}
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
                        {difficulty && (
                            <p>
                                <span className="text-amber-300">
                                    Difficulty:{" "}
                                </span>
                                <span>
                                    <b>{difficulty}</b>
                                </span>
                            </p>
                        )}
                        {tags && tags.length > 0 && (
                            <p>
                                <span className="text-amber-300">Tags: </span>
                                {tags.map((element, index) => (
                                    <li key={index}>{element}</li>
                                ))}
                            </p>
                        )}
                        {author && author.length > 0 && judge === "Timus" ? (
                            <p>
                                <span className="text-amber-300">
                                    Information:
                                </span>
                                <ul>
                                    {author.map((element, index) => (
                                        <li key={index}>{element}</li>
                                    ))}
                                </ul>
                            </p>
                        ) : (
                            <div>
                                <span className="text-amber-300">
                                    Author:
                                </span>{" "}
                                {ReactHtmlParser(author)}
                            </div>
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