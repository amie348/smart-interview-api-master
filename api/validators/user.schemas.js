const Joi = require(`joi`);
const passwordComplexity = require('joi-password-complexity')
const {ALLOWED_USER_ROLES} = require(`../config`);
const { validatePhoneNo, objectIdValidation } = require(`../helpers/joi.helpers`)


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
  role : Joi.string().valid(...ALLOWED_USER_ROLES).required()

})

// account activation input validation schema 
const activateUserSchema = Joi.object({

  activationToken: Joi.string().required()

})

// validation schema for user login
const loginSchema= Joi.object({

  email: Joi.string().email().required(),
  password: passwordComplexity(complexityOptions).required()

});


const educationSchema = Joi.object({

  qualification: Joi.string().required(),
  instituteName: Joi.string().required(),
  completionYear: Joi.string().required()

})


const workExperienceSchema = Joi.object({

  jobType: Joi.string().required(),
  joinDate: Joi.string().required(),
  endDate: Joi.date().required(),
  address: Joi.string().required()

})


const candidateSchema = Joi.object({

  age: Joi.number().required(),
  address: Joi.string().required(),
  skills: Joi.array().items(Joi.string()).required(),
  education: Joi.array().items(educationSchema),
  workExperience: Joi.array().items(workExperienceSchema),
  desiredJobTitles: Joi.array().items(Joi.string().required()).required(),
  phoneNumber: Joi.string().required(),//.custom(validatePhoneNo, `Validating Phone Number`),
  remoteWork: Joi.bool()

})

const updateCandidateSchema = Joi.object({

  age: Joi.number(),
  address: Joi.string(),
  skills: Joi.array().items(Joi.string()),
  education: Joi.array().items(educationSchema),
  workExperience: Joi.array().items(workExperienceSchema),
  desiredJobTitles: Joi.array().items(Joi.string().required()),
  phoneNumber: Joi.string(),//.custom(validatePhoneNo, `Validating Phone Number`),
  remoteWork: Joi.bool()

})

const specificCandidateIdSchema = Joi.object({

  _candidateId: Joi.string().custom(objectIdValidation, `Validating Specific Candidate`).required()

})

const interviewerIdSchema = Joi.object({

  _interviewerId: Joi.string().custom(objectIdValidation, `Validating Specific Interviewer`).required()

})

const interviewerSchema = Joi.object({

  age: Joi.number().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  education: educationSchema.required(),
  phoneNumber: Joi.string().required(),//.custom(validatePhoneNo, `Validating Phone Number`),

})

const updateInterviewerSchema = Joi.object({

  age: Joi.number(),
  address: Joi.string(),
  city: Joi.string(),
  education: educationSchema,
  phoneNumber: Joi.string(),//.custom(validatePhoneNo, `Validating Phone Number`),

})


// exporting input validation schemas as module
module.exports = {

  loginSchema,
  candidateSchema,
  registerUserSchema,
  activateUserSchema,
  updateCandidateSchema,
  specificCandidateIdSchema,
  interviewerSchema,
  updateInterviewerSchema,
  interviewerIdSchema

}