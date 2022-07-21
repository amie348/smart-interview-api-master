const mongoose = require(`mongoose`);



const meetingSchema = mongoose.Schema({

  madeBy: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'Interviewer' 
  },
  candidateUserEmail: { 
      type : String,
      trim: true 
  },
  pin:{
      type: String,
  },
  expiryDate: {
      type: Date,
  },
  startDate: {
      type: Date,
  },
  callStartTime: {
      type: Date,
  },
  callEndingTime:{
      type: Date,
  },
  password: {
      type : String,
  },
  status : {
      type: String,
      trim: true,
      uppercase: true
  },
  // joined: {
  //     type: Number,
  //     default: 0 //0 for not joined, 1 for joined
  // }
  
}, {
  timestamps: true
})


module.exports = mongoose.model("meeting", meetingSchema);