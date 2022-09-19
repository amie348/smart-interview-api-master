const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  
  createdBy : {
    type: mongoose.Types.ObjectId,
    ref: `user`
  },
  title: {
    type: String
  },
  pin: {
    type: String,
  },
  amount: {
    type: String,
  },
  topic: {
    type: Number,
  },
  time: {
    type: String,
  },
  score: {
    type: Number
  },
  questions: [{
    statement : {
      type: String
    },
    options: [String],
    correct: {
      type: String
    },
    submitted: {
      type: String,
    }
  }],
  attempted: {
    type: Boolean,
    default: false
  },
  expiryDate: {
    type: Date,
  },

},{
  timestamps: true
});

module.exports = mongoose.model("test", testSchema);
