const reportRouter = require(`express`).Router();

const { ALLOWED_VALIDATION_SCHEMA_SCOPES: { BODY,PARAMS , QUERY, NONE }} = require(`../config`)

// importing required controllers
const { createReportByMeetingId, getSpecificReport, getReportsOfInterviewer, updateReportById, deleteReportById } = require(`../controllers/report.controller`);


const { decodeActivationToken, authenticateUser, authorizeInterviewer } = require(`../middlewares/authentication.middleware`);




reportRouter.post(`/create/:meetingId`, authenticateUser, authorizeInterviewer, createReportByMeetingId);
reportRouter.get(`/get-specific/:reportId`, authenticateUser, authorizeInterviewer, getSpecificReport);
reportRouter.get(`/get-interviewer-reports`, authenticateUser, authorizeInterviewer, getReportsOfInterviewer);
reportRouter.patch(`/update/:reportId`, authenticateUser, authorizeInterviewer, updateReportById);
reportRouter.delete(`/delete/:reportId`, authenticateUser, authorizeInterviewer, deleteReportById);



// exporting router as module
module.exports = {

  reportRouter

}