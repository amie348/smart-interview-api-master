const userRouter = require(`express`).Router();

// importing required middlewares
const { validateInput } = require(`../middlewares/input-validation-middleware`);

// importing required validation schemas
const { registerUserSchema, activateUserSchema, loginSchema, candidateSchema } = require(`../../dependencies/joi-validation-schemas/user.schemas`);

const { ALLOWED_VALIDATION_SCHEMA_SCOPES: { BODY,PARAMS , QUERY, NONE }} = require(`../../dependencies/config`)

// importing required controllers
const { register, activate, login, addCandidateInfo } = require(`../controllers/user.controllers`);


const { decodeActivationToken, authenticateUser } = require(`../middlewares/authentication.middleware`);


userRouter.post(`/register`, validateInput(registerUserSchema, BODY), register);
userRouter.post(`/activate/:activationToken`, validateInput(activateUserSchema, PARAMS), decodeActivationToken, activate);
userRouter.post(`/login`, validateInput(loginSchema, BODY),  login);



userRouter.post(`/candidate/add`, authenticateUser, validateInput(candidateSchema, BODY), addCandidateInfo);

// exporting router as module
module.exports = {

  userRouter

}