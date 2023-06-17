export default function filterSubmissionData(data){
    const atc = new Set();
    const cf = new Set();
    const sp = new Set();
    const tim = new Set();

    let total = 0;
    let atcoder = 0;
    let codeforces = 0;
    let spoj = 0;
    let timus = 0;

    for (const obj of data) {
        if (obj.verdict === "Accepted") {
            if (obj.judge === "Atcoder" && !atc.has(obj.problemID)) {
                atcoder++;
                atc.add(obj.problemID);
            }
            if (obj.judge === "Codeforces" && !cf.has(obj.problemID)) {
                codeforces++;
                cf.add(obj.problemID);
            }
            if (obj.judge === "Spoj" && !sp.has(obj.problemID)) {
                spoj++;
                sp.add(obj.problemID);
            }
            if (obj.judge === "Timus" && !tim.has(obj.problemID)) {
                timus++;
                tim.add(obj.problemID);
            }
        }
    }
    total = atcoder + codeforces + spoj + timus;
    return {
        total,
        atcoder,
        codeforces,
        spoj,
        timus,
    };
};