const Joi = require(`joi`);
const { validatePhoneNo, objectIdValidation } = require(`../helpers/joi.helpers`);



const newMeetingSchema = Joi.object({

  candidateUserEmail: Joi.string().email().required(),
  password: Joi.string().required(),
  expiryDate: Joi.date().required(),
  startDate: Joi.date().required(),
  
});

const updateMeetingSchema = Joi.object({

  status : Joi.string(),
  startedAt: Joi.date(),
  endedAt: Joi.date()

})

const joinMeetingSchema = Joi.object({

  password: Joi.string().required()

})

// const inviteMemebersSchema = Joi.object({



// })

module.exports = {

  newMeetingSchema,
  updateMeetingSchema,
  joinMeetingSchema

}