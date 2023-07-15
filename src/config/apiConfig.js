const backendURL = 'https://codetracker-backend.vercel.app';
            
const apiEndPoints = {
    register: `/api/register/`,
    verifyRegistration: `/api/register-verify/`,
    login: `/api/login/`,
    logout: `/api/logout/`,
    passwordUpdate: `/api/reset-password/`,
    passwordUpdateVerify: `/api/reset-password-verify/`,
    registerContest: `/api/contest/register/`,
    createContest: `/api/contest/create/`,
    // will include contest ID
    contestStandingByContestID: `/api/contest-query/standings/`,
    // will include contest ID
    contestSubmissionsByContestID: `/api/submissions/specific-contest/`,
    problemAll: `/api/problem-all`,
    contestAll: `/api/contest-query/all`,
    // will include judge, problem ID, contestID
    submissionOfSpecificProblem: `/api/submissions/specific-problem/`,
    contestProblems: `/api/contest-problem/all/`,
    submit: `/api/submit`,
    problem: `/api/problem`,
    // will include username
    submissionsByUser: `/api/submissions/specific-user/`,
}

export default apiEndPoints;