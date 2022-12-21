const mongoose = require('mongoose')



const jobSchema = new mongoose.Schema({
  
  postedBy: { 
    type: mongoose.Types.ObjectId, 
    ref: 'Interviewer',
    required : true
  },
  
  applications: [{
    appliedBy: { 
      type: mongoose.Types.ObjectId, 
      ref: 'user',
      },
    meetingId: { 
      type: mongoose.Types.ObjectId, 
      ref: 'meeting',
      },
    createdAt: {
      type: Date,
    }
    }],
  
  title: {
    type : String,
    default: "" 
  },
  salary: {
    start: {
    type : Number,
    default: 0 
    },
    end: {
    type : Number,
    default: 0 
    }
  },
  jobDescription: {
    type : String,
    default: "" 
  },
  workhours:{
    type : Number,
    default: 0 
  },
  postPicture: {
    type : String,
    default: "https://res.cloudinary.com/xapper72/image/upload/v1619373955/avatar/job-post-default_bu5cbs.jpg"
  },
  skills : [],
  location:{
    type : String,
    trim: true
  },
  experience: {
    type : String,
    default: "" 
  },
  qualification: {
    type : String,
    default: "" 
  },
  careerLevel: {
    type : String,
    default: "" 
  },
  expiryDate: {
    type: Date,
    default: ""
  },
}, {
  timestamps: true
})

module.exports = mongoose.model("Job", jobSchema);