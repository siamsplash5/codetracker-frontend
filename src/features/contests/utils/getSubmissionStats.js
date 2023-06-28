import getProblemIndex from "./getProblemIndex";

function comparePenalty(a, b) {
    if (a.score > b.score) {
        return -1;
    }
    if (a.score < b.score) {
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

        let score = 0;
        let penalty = 0;
        let wrongSubmission = 0;

        const perProblemStats = Object.fromEntries(
            alphabetRange.map((index) => [
                index,
                { wrongSubmission: 0, isAccepted: false },
            ])
        );

        submissions.forEach((problemStats) => {
            const { problemIndex, totalSubmission, isAccepted, totalAcceptedSubmission, acceptedTime } =
                problemStats;
            const acceptedTimeInMinute = Math.ceil(acceptedTime / (60 * 1000));

            //standing table accepted/submission ratio per problem
            submission[problemIndex] += totalSubmission;
            accepted[problemIndex] += isAccepted;

            //user's contest score
            score += isAccepted;
            wrongSubmission = (totalSubmission - totalAcceptedSubmission);
            if(isAccepted) penalty += (acceptedTimeInMinute + (20 * wrongSubmission));
            
            //user's submission stat based on problemIndex
            perProblemStats[problemIndex] = {
                wrongSubmission,
                isAccepted,
                acceptedTimeInMinute
            };
        });
        userInfo.score = score;
        userInfo.penalty = penalty;
        userInfo.problemStats = perProblemStats;
        ranklist.push(userInfo);
    });
    ranklist.sort(comparePenalty);
    return { submission, accepted, ranklist };
}
