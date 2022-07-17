const userRouter = require(`express`).Router();

// importing required middlewares
const { validateInput } = require(`../middlewares/input-validation-middleware`);

// importing required validation schemas
const { 
  registerUserSchema, 
  activateUserSchema, 
  loginSchema, 
  candidateSchema, 
  updateCandidateSchema, 
  specificCandidateIdSchema, 
  interviewerSchema, 
  updateInterviewerSchema,
  interviewerIdSchema
} = require(`../validators/user.schemas`);

const { ALLOWED_VALIDATION_SCHEMA_SCOPES: { BODY,PARAMS , QUERY, NONE }} = require(`../config`)

// importing required controllers
const { register, activate, login, addCandidateInfo, updateCandidateInfoById, addInterviewerInfo, updateInterviewerInfoById } = require(`../controllers/user.controllers`);


const { decodeActivationToken, authenticateUser } = require(`../middlewares/authentication.middleware`);


userRouter.post(`/register`, validateInput(registerUserSchema, BODY), register);
userRouter.post(`/activate/:activationToken`, validateInput(activateUserSchema, PARAMS), decodeActivationToken, activate);
userRouter.post(`/login`, validateInput(loginSchema, BODY),  login);



userRouter.post(`/candidate`, authenticateUser, validateInput(candidateSchema, BODY), addCandidateInfo);
userRouter.patch(`/candidate/:_candidateId`, authenticateUser, validateInput(specificCandidateIdSchema, PARAMS), validateInput(updateCandidateSchema, BODY), updateCandidateInfoById);


userRouter.post(`/interviewer`, authenticateUser , validateInput(interviewerSchema, BODY), addInterviewerInfo)
userRouter.patch(`/interviewer/:_interviewerId`, authenticateUser, validateInput(interviewerIdSchema, PARAMS), validateInput(updateInterviewerSchema, BODY), updateInterviewerInfoById);


userRouter.post(`/company`, authenticateUser , validateInput(interviewerSchema, BODY), addInterviewerInfo)
userRouter.patch(`/company/:_Id`, authenticateUser, validateInput(interviewerIdSchema, PARAMS), validateInput(updateInterviewerSchema, BODY), updateInterviewerInfoById);



// exporting router as module
module.exports = {

  userRouter

}