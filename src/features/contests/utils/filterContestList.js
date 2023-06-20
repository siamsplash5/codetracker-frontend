export default function filterContestList(allContests) {
    const upcomingContests = [];
    const runningContests = [];
    const finishedContests = [];
    const publicContests = [];
    const privateContests = [];
    const protectedContests = [];

    allContests.forEach((contest) => {
        if (contest.beginTime + contest.contestLength < Date.now()) {
            finishedContests.push(contest);
        } else if (contest.beginTime > Date.now()) {
            upcomingContests.push(contest);
        } else {
            runningContests.push(contest);
        }
        if (contest.privacy === "Public") {
            publicContests.push(contest);
        } else if (contest.privacy === "Private") {
            privateContests.push(contest);
        } else if (contest.privacy === "Protected") {
            protectedContests.push(contest);
        }
    });

    return {
        allContests,
        upcomingContests,
        runningContests,
        finishedContests,
        publicContests,
        privateContests,
        protectedContests,
    };
}