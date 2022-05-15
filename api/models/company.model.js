const mongoose = require('mongoose');



const companySchema = new mongoose.Schema({

  _madeBy: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'Interviewer' 
  },
  company_name: {
    type: String,
    default: ``
  },
  ceoName: {
    type: String,
    default: ``
  },  
  companyAddress: {
    type: String,
    default: ``
  },
  companyDescription:{
    type: String,
    defualt: ``
  },
  industry: {
    type: String,
    default: ``
  },
  ownershipType : {
    type: String,
    defualt: `` //public/ private/ sole partnership/ government/ ngo
  },
  employeesNo: {
    type: String,
    default: ``
  },
  origin:{
    type: String,
    default:``
  },
  operatingSince :{
    type: String,
    default: ``
  },
  officesNo: {
    type: Number,
    default: 0,
  },
  contactEmail: {
    type: String,
    default: ``,
  },
  contactNo: {
    type: String,
    default: ``
  },
}, {
  timestamps: true
})

module.exports = new mongoose.model(`company`, companySchema);