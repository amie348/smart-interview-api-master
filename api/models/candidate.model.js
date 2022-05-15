const mongoose = require(`mongoose`);

// importing required schemas
const { addressSchema } = require(`./schemas/address.schema`)



const candiateSchema = new mongoose.Schema({

  _userId: {
      type: mongoose.Types.ObjectId,
      ref: `user`
  },
  age:{
    type: Number,
    required: true
  },
  address: addressSchema,
  skills:{
    type: [String],
    trim: true,
    required: true
  },
  education: [{
    qualification: {
        type : String,
        default: ``
    },
    instituteName: {
        type: String,
        default: ``
    },
    completionYear: {
        type: String,
        default: ``
    }
  }],
  workExperience:[{

    jobType:{
      type: String,
      trim: true,
      default:``
    },
    joinDate:{
      type: Date,
      required: true
    },
    endDate:{
      type: Date,
      required: true
    },
    address: {
      type: addressSchema,
      default: {}
    },

  }],
  desiredJobTitles:{
    type: [String],
    trim: true,
  },
  phoneNumber:{
    type: String,
    trim: true,
    required: true
  },
  remoteWork:{
    type: Boolean,
    default: false
  },
  
},{
  timestamps: true
});



module.exports = new mongoose.model(`candidate`, candiateSchema)