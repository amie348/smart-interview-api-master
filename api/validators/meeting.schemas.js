const Joi = require(`joi`);
const { validatePhoneNo, objectIdValidation } = require(`../helpers/joi.helpers`);



const newTestSchema = Joi.object({

  title: Joi.string().required(),
  pin: Joi.string().required(),
  // email: Joi.string().required(),
  amount: Joi.number().required(),
  topic: Joi.number().required(),
  time: Joi.number().required(),
  expiryDate: Joi.date().required(),

});

const updateTestSchema = Joi.object({

  title: Joi.string(),
  pin: Joi.string(),
  // email: Joi.string(),
  amount: Joi.number(),
  topic: Joi.string(),
  time: Joi.number(),
  attempted: Joi.boolean(),
  expirydate: Joi.date(),

});

const newMeetingSchema = Joi.object({

  candidateUserEmail: Joi.string().email().required(),
  test: Joi.string().allow(null, ""),
  password: Joi.string().required(),
  expiryDate: Joi.date().required(),
  startDate: Joi.date().required(),
  
});

const updateMeetingSchema = Joi.object({
  
  candidateUserEmail: Joi.string().email().required(),
  test: Joi.string().allow(null, ""),
  status : Joi.string(),
  startedAt: Joi.date(),
  endedAt: Joi.date()

});

const joinMeetingSchema = Joi.object({

  password: Joi.string().required()

});




// const inviteMemebersSchema = Joi.object({



// })

module.exports = {

  newTestSchema,
  updateTestSchema,

  newMeetingSchema,
  updateMeetingSchema,
  joinMeetingSchema

}