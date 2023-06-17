export default function Button(props){
    return (
        <button
            type="submit"
            className="w-full text-white bg-indigo-800 hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-buttons dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
            {props.children}
        </button>
    );
}