import getProblemIndex from "./getProblemIndex";

function comparePenalty(a, b) {
    if (a.totalScore > b.totalScore) {
        return -1;
    }
    if (a.totalScore < b.totalScore) {
        return 1;
    }
    if (a.penalty < b.penalty) {
        return -1;
    }
    if (a.penalty > b.penalty) {
        return 1;
    }
    return 0;
}

export default function getSubmissionStats(data, totalProblem) {
    const alphabetRange = Array.from({ length: totalProblem }, (_, i) =>
        getProblemIndex(i)
    );
    const submission = Object.fromEntries(
        alphabetRange.map((index) => [index, 0])
    );
    const accepted = Object.fromEntries(
        alphabetRange.map((index) => [index, 0])
    );
    const ranklist = [];

    data.forEach((user) => {
        const { submissions } = user;
        const userInfo = {};
        userInfo.username = user.username;
        let totalScore = 0;
        let totalPenalty = 0;
        let totalWrongSubmission = 0;
        const perProblemStats = Object.fromEntries(
            alphabetRange.map((index) => [
                index,
                { totalWrongSubmission: 0, isAccepted: false },
            ])
        );
        submissions.forEach((submissionObj) => {
            const { problemIndex, totalSubmission, isAccepted, totalAcceptedSubmission, acceptedTime } =
                submissionObj;

            //standing table accepted/submission ratio per problem
            submission[problemIndex] += totalSubmission;
            accepted[problemIndex] += isAccepted;

            //user's contest score
            totalScore += isAccepted;
            totalWrongSubmission += totalSubmission - totalAcceptedSubmission;
            totalPenalty += acceptedTime / (60 * 1000);
            
            //store user's submission stat based on problemIndex
            perProblemStats[problemIndex] = {
                totalWrongSubmission,
                isAccepted,
            };
        });
        userInfo.totalScore = totalScore;
        userInfo.penalty = Math.floor(totalPenalty + totalWrongSubmission * 20);
        userInfo.problemStats = perProblemStats;
        ranklist.push(userInfo);
    });
    ranklist.sort(comparePenalty);
    return { submission, accepted, ranklist };
}
