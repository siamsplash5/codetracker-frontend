import axios from "axios";

export default async function submitHandler({problem, langID, sourceCode, setStatusInfo, setShowServerError}){
    try {
        const { data } = await axios.post("/api/submit", {
            judge: problem.judge,
            problemID: problem.problemID,
            problemName: problem.title,
            langID,
            sourceCode,
        });
        if(setStatusInfo){
            setStatusInfo(data);
            if(setShowServerError){
                setShowServerError(false);
            }
        }else{
            return data;
        }
    } catch (error) {
        console.log(error);
        if(setShowServerError){
            setShowServerError(true);
        }
    }
}