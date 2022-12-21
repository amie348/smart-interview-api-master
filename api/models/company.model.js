const mongoose = require('mongoose');



const companySchema = new mongoose.Schema({

  companyName: {
    type: String,
  },
  ceoName: {
    type: String,
  },  
  companyAddress: {
    type: String,
  },
  companyDescription:{
    type: String,
  },
  industry: {
    type: String,
  },
  ownershipType : {
    type: String,
  },
  employeesNo: {
    type: Number,
  },
  origin:{
    type: String,
  },
  operatingSince :{
    type: Date,
  },
  officesNo: {
    type: Number,
    default: 0,
  },
  contactEmail: {
    type: String,
  },
  contactNo: {
    type: String,
  },
}, {
  timestamps: true
})

module.exports = new mongoose.model(`company`, companySchema);