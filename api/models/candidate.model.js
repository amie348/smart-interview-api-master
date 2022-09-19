const mongoose = require(`mongoose`);

// importing required schemas
// const { addressSchema } = require(`./schemas/address.schema`)



const candiateSchema = new mongoose.Schema({

  _userId: {
      type: mongoose.Types.ObjectId,
      ref: `user`,
      unique: true
  },
  age:{
    type: Number,
    required: true
  },
  city: {
    type: String,
    default: ""
  },
  // address: addressSchema,
  address : {
    type: String,
    trim: true
  },
  skills:{
    type: [String],
    trim: true,
  },
  education: {
    _id: false,

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
  },
  workExperience:{

    _id: false,

    jobType:{
      type: String,
      default:``
    },
    joinDate:{
      type: Date,
    },
    endDate:{
      type: Date,
    },
    address: {
      type: String,
    },

  },
  desiredJobTitles:{
    type: [String],
    trim: true,
  },
  phoneNumber:{
    type: String,
    trim: true,
  },
  remoteWork:{
    type: Boolean,
    default: false
  },
  
},{
  timestamps: true
});



module.exports = new mongoose.model(`candidate`, candiateSchema)