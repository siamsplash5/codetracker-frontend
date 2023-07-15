const backendURL = 'https://codetracker-backend.vercel.app';
            
const apiEndPoints = {
    register: `/register/`,
    verifyRegistration: `/register-verify/`,
    login: `/login/`,
    logout: `/logout/`,
    passwordUpdate: `/reset-password/`,
    passwordUpdateVerify: `/reset-password-verify/`,
    registerContest: `/contest/register/`,
    createContest: `/contest/create/`,
    // will include contest ID
    contestStandingByContestID: `/contest-query/standings/`,
    // will include contest ID
    contestSubmissionsByContestID: `/submissions/specific-contest/`,
    problemAll: `/problem-all`,
    contestAll: `/contest-query/all`,
    // will include judge, problem ID, contestID
    submissionOfSpecificProblem: `/submissions/specific-problem/`,
    contestProblems: `/contest-problem/all/`,
    submit: `/submit`,
    problem: `/problem`,
    // will include username
    submissionsByUser: `/submissions/specific-user/`,
}

export default apiEndPoints;