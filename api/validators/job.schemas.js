const Joi = require(`joi`);
const { validatePhoneNo, objectIdValidation } = require(`../helpers/joi.helpers`)



const newJobSchema = Joi.object({

  title: Joi.string().required(),
  salary: Joi.object({
    start: Joi.number().required(),
    end: Joi.number().required()
  }),
  jobDescription: Joi.string().required(),
  workhours: Joi.number().required(),
  postPicture: Joi.string().required(),
  skills: Joi.array().items(Joi.string()).required(),
  location: Joi.string().required(),
  experience: Joi.number().required(),
  qualification: Joi.string().required(),
  careerLevel: Joi.string().required(),
  expiryDate: Joi.date().required(),
  remoteWork: Joi.boolean().required()
})

const getJobsSchema = Joi.object({

  searchFilters: Joi.object()

})



module.exports = {

  newJobSchema,
  getJobsSchema

}