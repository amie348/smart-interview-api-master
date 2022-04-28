const userRouter = require(`express`).Router();

// importing required middlewares
const { validateInput } = require(`../middlewares/input-validation-middleware`);

// importing required validation schemas
const { registerUserSchema } = require(`../../dependencies/joi-validation-schemas/user.schemas`);


// importing required controllers
const { register } = require(`../controllers/user.controllers`);


userRouter.post(`/register`, validateInput(registerUserSchema, `BODY`), register);



// exporting router as module
module.exports = {

  userRouter

}