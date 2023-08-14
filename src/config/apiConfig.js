const backendURL = 'https://codetracker-backend.vercel.app'; //production
// const backendURL = ''; //development
            
const apiEndPoints = {
    register: `${backendURL}/api/register/`,
    verifyRegistration: `${backendURL}/api/register-verify/`,
    login: `${backendURL}/api/login/`,
    logout: `${backendURL}/api/logout/`,
    passwordUpdate: `${backendURL}/api/forgot-password/`,
    passwordUpdateVerify: `${backendURL}/api/forgot-password/update`,
    registerContest: `${backendURL}/api/contest/register/`,
    createContest: `${backendURL}/api/contest/create/`,
    // will include contest ID
    contestStandingByContestID: `${backendURL}/api/contest-query/standings/`,
    // will include contest ID
    contestSubmissionsByContestID: `${backendURL}/api/submissions/specific-contest/`,
    problemAll: `${backendURL}/api/problem/all`,
    contestAll: `${backendURL}/api/contest-query/all`,
    // will include judge, problem ID, contestID
    submissionOfSpecificProblem: `${backendURL}/api/submissions/specific-problem/`,
    contestProblems: `${backendURL}/api/contest-problem/all/`,
    submit: `${backendURL}/api/submit`,
    problem: `${backendURL}/api/problem/one`,
    // will include username
    submissionsByUser: `${backendURL}/api/submissions/specific-user/`,
}

export default apiEndPoints;