const meetingRouter = require(`express`).Router();

// importing required middlewares
const { validateInput } = require(`../middlewares/input-validation-middleware`);

// importing required validation schemas

const { ALLOWED_VALIDATION_SCHEMA_SCOPES: { BODY,PARAMS , QUERY, NONE }} = require(`../config`)


const { authenticateUser, authorizeInterviewer, authorizeCandidate } = require(`../middlewares/authentication.middleware`);

const { newMeetingSchema, updateMeetingSchema, joinMeetingSchema, newTestSchema, submitTestSchema } = require(`../validators/meeting.schemas`)



const { addMeeting, updateMeetingById, getMeetingsForCandidate, getMeetingsForInterviewer, createTest, getQuizNames, getInterviewerTests, getTestsForCandidates, getSpecificInterviewerMeeting, getSpecificCandidateMeeting, submitTest, getSpecificTest, deleteTestById, deleteMeetingById } = require(`../controllers/meeting.controllers`)



meetingRouter.post(`/tests/add`, authenticateUser, authorizeInterviewer, validateInput(newTestSchema, BODY), createTest)
meetingRouter.get(`/tests/names`, authenticateUser, authorizeInterviewer,  getQuizNames);
meetingRouter.post(`/tests/get`, authenticateUser, authorizeInterviewer,  getInterviewerTests);
meetingRouter.delete(`/tests/delete-specific/:testId`, authenticateUser, authorizeInterviewer, deleteTestById)
meetingRouter.get(`/tests/get-specific/:testId`, authenticateUser, getSpecificTest);
meetingRouter.post(`/tests/get-candidate-tests`, authenticateUser, authorizeCandidate,  getTestsForCandidates);
meetingRouter.post(`/tests/submit/:testId`, authenticateUser, authorizeCandidate, validateInput(submitTestSchema, BODY),  submitTest)

meetingRouter.post(`/get-candidate-meetings`, authenticateUser, authorizeCandidate,  getMeetingsForCandidate)
meetingRouter.post(`/get-interviewer-meetings`, authenticateUser, authorizeInterviewer,  getMeetingsForInterviewer)
meetingRouter.delete(`/delete-interviewer-Specific/:meetingId`, authenticateUser, authorizeInterviewer,  deleteMeetingById)
meetingRouter.get(`/get-interviewer-Specific/:meetingId`, authenticateUser, authorizeInterviewer,  getSpecificInterviewerMeeting)
meetingRouter.get(`/get-candidate-Specific/:meetingId`, authenticateUser, authorizeCandidate,  getSpecificCandidateMeeting)
meetingRouter.post(`/add`, authenticateUser, authorizeInterviewer, validateInput(newMeetingSchema, BODY), addMeeting)
meetingRouter.patch(`/update/:_meetingId`, authenticateUser, authorizeInterviewer, validateInput(updateMeetingSchema, BODY), updateMeetingById)



module.exports = {

  meetingRouter

}