const userRouter = require(`express`).Router();

// importing required middlewares
const { validateInput } = require(`../middlewares/input-validation-middleware`);

// importing required validation schemas
const { registerUserSchema, activateUserSchema, loginSchema } = require(`../../dependencies/joi-validation-schemas/user.schemas`);

const { ALLOWED_VALIDATION_SCHEMA_SCOPES: { BODY,PARAMS , QUERY, NONE }} = require(`../../dependencies/config`)

// importing required controllers
const { register, activate, login } = require(`../controllers/user.controllers`);

const { decodeActivationToken } = require(`../middlewares/activate.middleware`);


userRouter.post(`/register`, validateInput(registerUserSchema, BODY), register);
userRouter.post(`/activate/:activationToken`, validateInput(activateUserSchema, PARAMS), decodeActivationToken, activate);
userRouter.post(`/sign-in`, validateInput(loginSchema, BODY),  login);


// exporting router as module
module.exports = {

  userRouter

}