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
  // role : Joi.string().valid(...ALLOWED_USER_ROLES).required()

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
  completionYear: Joi.number().required()

})


const workExperienceSchema = Joi.object({

  jobType: Joi.string().required(),
  joinDate: Joi.string().required(),
  endDate: Joi.date().required(),
  address: Joi.string().required()

});


const candidateSchema = Joi.object({

  age: Joi.number().required(),
  city: Joi.string().required(),
  phoneNumber: Joi.string().required(),//.custom(validatePhoneNo, `Validating Phone Number`),
  address: Joi.string().required(),
  skills: Joi.array().items(Joi.string()).required(),
  education: Joi.array().items(educationSchema),
  workExperience: Joi.array().items(workExperienceSchema),
  desiredJobTitles: Joi.array().items(Joi.string().required()),
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

const companySchema = Joi.object({

  companyName: Joi.string().required(),
  ceoName: Joi.string().required(),
  companyAddress: Joi.string().required(),
  companyDescription: Joi.string().required(),
  industry: Joi.string().required(),
  ownershipType: Joi.string().required(),
  employeesNo: Joi.number().required(),
  origin: Joi.string().required(),
  operatingSince: Joi.date().required(),
  officesNo: Joi.number().required(),
  contactEmail: Joi.string().email().required(),
  contactNo: Joi.string().required(),

})

const updateCompnaySchema = Joi.object({

  companyName: Joi.string(),
  ceoName: Joi.string(),
  companyAddress: Joi.string(),
  companyDescription: Joi.string(),
  industry: Joi.string(),
  ownershipType: Joi.string(),
  employeesNo: Joi.number(),
  origin: Joi.string(),
  operatingSince: Joi.date(),
  officesNo: Joi.number(),
  contactEmail: Joi.string().email(),
  contactNo: Joi.string(),

})


const interviewerSchema = Joi.object({

  age: Joi.number().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  phoneNumber: Joi.string().required(),//.custom(validatePhoneNo, `Validating Phone Number`),
  education: educationSchema.required(),
  company: companySchema.required()
})

const updateInterviewerSchema = Joi.object({

  age: Joi.number(),
  address: Joi.string(),
  city: Joi.string(),
  phoneNumber: Joi.string(),//.custom(validatePhoneNo, `Validating Phone Number`),
  education: educationSchema,
  company: companySchema.required()

})






// exporting input validation schemas as module
module.exports = {

  loginSchema,
  registerUserSchema,
  activateUserSchema,
  
  candidateSchema,
  updateCandidateSchema,
  specificCandidateIdSchema,
  
  interviewerSchema,
  updateInterviewerSchema,
  interviewerIdSchema,

  companySchema,
  updateCompnaySchema

}