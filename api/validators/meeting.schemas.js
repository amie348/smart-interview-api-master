const Joi = require(`joi`);
const { validatePhoneNo, objectIdValidation } = require(`../helpers/joi.helpers`);



const newMeetingSchema = Joi.object({

  candidateUserEmail: Joi.string().email().required(),
  pin: Joi.string().required(),
  expiryDate: Joi.date().required(),
  startDate: Joi.date().required(),
  
});



module.exports = {

  newMeetingSchema

}