const mongoose = require(`mongoose`);



const userSchema = new mongoose.Schema({

  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type:String,
    required: true,
    unique: true
  },
  password: {
    type:String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  dp: {
    type: String,
  }
},

{
  timestamps: true
}

)


module.exports = new mongoose.model('user', userSchema);