const meetingRouter = require(`express`).Router();

// importing required middlewares
const { validateInput } = require(`../middlewares/input-validation-middleware`);

// importing required validation schemas

const { ALLOWED_VALIDATION_SCHEMA_SCOPES: { BODY,PARAMS , QUERY, NONE }} = require(`../config`)


const { authenticateUser, authorizeInterviewer, authorizeCandidate } = require(`../middlewares/authentication.middleware`);

const { newMeetingSchema, updateMeetingSchema, joinMeetingSchema } = require(`../validators/meeting.schemas`)

const { addMeeting, updateMeetingById } = require(`../controllers/meeting.controllers`)



meetingRouter.post(`/add`, authenticateUser, authorizeInterviewer, validateInput(newMeetingSchema, BODY), addMeeting)
meetingRouter.patch(`/update/_meetingId`, authenticateUser, authorizeInterviewer, validateInput(updateMeetingSchema, BODY), updateMeetingById)



module.exports = {

  meetingRouter

}