const jobRouter = require(`express`).Router();

// importing required middlewares
const { validateInput } = require(`../middlewares/input-validation-middleware`);

// importing required validation schemas

const { ALLOWED_VALIDATION_SCHEMA_SCOPES: { BODY,PARAMS , QUERY, NONE }} = require(`../config`)


const { authenticateUser, authorizeInterviewer, authorizeCandidate } = require(`../middlewares/authentication.middleware`);

const { newJobSchema, getJobsSchema } = require(`../validators/job.schemas`);
const { newMeetingSchema } = require(`../validators/meeting.schemas`)


const { addJob, getJobs, applyForJob, deleteJob, getApplicantsOfSpecificJob, ScheduleMeeting } = require(`../controllers/jobs.controllers`)


jobRouter.get(`/recruiter/get`, authenticateUser, authorizeInterviewer, getJobs);
jobRouter.get(`/candidate/get`, authenticateUser, authorizeCandidate,  getJobs);
jobRouter.get(`/:_jobId/applicants/get`, authenticateUser, authorizeInterviewer,  getApplicantsOfSpecificJob);


jobRouter.post(`/add`, authenticateUser, authorizeInterviewer, validateInput(newJobSchema, BODY), addJob);
jobRouter.post(`/apply/:_jobId`, authenticateUser, authorizeCandidate, applyForJob)


jobRouter.delete(`/delete/:_jobId`, authenticateUser, authorizeInterviewer, deleteJob)

// jobRouter.patch(`/:_candidateId`, authenticateUser, validateInput(specificCandidateIdSchema, PARAMS), validateInput(updateCandidateSchema, BODY), updateCandidateInfoById);

jobRouter.post(`/:_jobId/application/:_applicationId`, authenticateUser, authorizeInterviewer, validateInput(newMeetingSchema) , ScheduleMeeting)



// exporting router as module
module.exports = {

  jobRouter

}