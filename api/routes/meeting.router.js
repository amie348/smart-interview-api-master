const meetingRouter = require(`express`).Router();

// importing required middlewares
const { validateInput } = require(`../middlewares/input-validation-middleware`);

// importing required validation schemas

const { ALLOWED_VALIDATION_SCHEMA_SCOPES: { BODY,PARAMS , QUERY, NONE }} = require(`../config`)


const { authenticateUser, authorizeInterviewer, authorizeCandidate } = require(`../middlewares/authentication.middleware`);

const { newMeetingSchema, updateMeetingSchema, joinMeetingSchema, newTestSchema } = require(`../validators/meeting.schemas`)



const { addMeeting, updateMeetingById, getMeetingsForCandidate, getMeetingsForInterviewer, createTest, getQuizNames, getInterviewerTests, getTestsForCandidates } = require(`../controllers/meeting.controllers`)



meetingRouter.post(`/tests/add`, authenticateUser, authorizeInterviewer, validateInput(newTestSchema, BODY), createTest)
meetingRouter.get(`/tests/names`, authenticateUser, authorizeInterviewer,  getQuizNames)
meetingRouter.post(`/tests/get`, authenticateUser, authorizeInterviewer,  getInterviewerTests)
meetingRouter.post(`/tests/get-candidate-tests`, authenticateUser, authorizeCandidate,  getTestsForCandidates)


meetingRouter.post(`/get-candidate-meetings`, authenticateUser, authorizeCandidate,  getMeetingsForCandidate)
meetingRouter.post(`/get-interviewer-meetings`, authenticateUser, authorizeInterviewer,  getMeetingsForInterviewer)



meetingRouter.post(`/add`, authenticateUser, authorizeInterviewer, validateInput(newMeetingSchema, BODY), addMeeting)
meetingRouter.patch(`/update/_meetingId`, authenticateUser, authorizeInterviewer, validateInput(updateMeetingSchema, BODY), updateMeetingById)



module.exports = {

  meetingRouter

}