import heroImage from '../assets/Business_SVG.svg';

export default function Hero(){
    return (
        <section className="bg-slate-100 text-black-900">
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                    <h1 className="text-5xl font-bold leading-none sm:text-6xl">
                        CodeTracker <br />
                        <span className="text-indigo-800">
                            A virtual judge{" "}
                        </span>
                        for competitive programmers
                    </h1>
                    <p className="mt-6 mb-8 text-lg sm:mb-12">
                        Currently Supports Atcoder, Codeforces, SPOJ & Timus
                    </p>
                    <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                        <a
                            rel="noopener noreferrer"
                            href="/problem"
                            className="px-8 py-3 text-lg font-semibold rounded bg-indigo-800 text-primary-50"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
                <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                    <img
                        src={heroImage}
                        alt="a hero image"
                        className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
                    />
                </div>
            </div>
        </section>
    );
}