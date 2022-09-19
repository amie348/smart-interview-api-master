const mongoose = require(`mongoose`);



const meetingSchema =new  mongoose.Schema({

  madeBy: { 
    type: mongoose.Types.ObjectId, 
    ref: 'Interviewer' 
  },
  test: {
    type: mongoose.Types.ObjectId,
    ref: `test`
  },
  // candidateId: { 
  //   type: mongoose.Schema.ObjectId, 
  //   ref: 'Candidate' 
  // },
  candidateUserEmail: { 
    type: String
  },
//   quizPin:{
//       type: String,
//   },
  expiryDate: {
      type: Date
  },
  startDate: {
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
  invitedMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interviewer"
  }],
  startedAt: {
    type: Date
  },
  endedAt: {
    type: Date
  },
  connection: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
})


module.exports = mongoose.model("meeting", meetingSchema);