const Joi = require(`joi`);
const passwordComplexity = require('joi-password-complexity')
const {ALLOWED_USER_ROLES} = require(`../config`);

const complexityOptions = {
  min: 5,
  max: 12,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};


// register user input validation schema
const registerUserSchema = Joi.object({

  username: Joi.string().min(5).max(15).required(),
  email: Joi.string().email().required(),
  password: passwordComplexity(complexityOptions).required(),
  role : Joi.string().allow(...ALLOWED_USER_ROLES).required()

})

// account activation input validation schema 
const activateUserSchema = Joi.object({

  activationToken: Joi.string().required()

})



// exporting input validation schemas as module
module.exports = {

  registerUserSchema,
  activateUserSchema

}