const mongoose = require(`mongoose`);



const userSchema = new mongoose.Schema({

  username: {
    type: String,
  },
  email: {
    type:String,
  },
  password: {
    type:String,
  },
  role: {
    type: String,
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