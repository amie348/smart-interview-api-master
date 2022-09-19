const mongoose = require(`mongoose`);



const reportSchema =new  mongoose.Schema({

  interviewer: { 
    type: mongoose.Types.ObjectId, 
    ref: 'Interviewer' 
  },
  candidate: { 
    type: mongoose.Types.ObjectId, 
    ref: 'Candidate' 
  },
  meeting: {
    type: mongoose.Types.ObjectId,
    ref: "meeting"
  },
  test: {
    type: mongoose.Types.ObjectId,
    ref: `test`
  },
  interviewerName: {
    type:String
  },
  candidateName: {
    type: String
  },
  emotionsPercentage: {
    type:Number,
    default: 0
  },
  testPercentage: {
    type: Number,
    default: 0
  },
  cvPercentage : {
    type: Number,
    default: 0
  },
  totalScore: {
    type: Number,
    default: 0
  },
  chartData : [],
  comment: {
    type: String,
    default: ""
  },
  hired: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
})


module.exports = mongoose.model("report", reportSchema);