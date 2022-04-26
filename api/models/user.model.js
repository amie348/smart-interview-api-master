const mongoose = require(`mongoose`);



const userSchema = mongoose.Schema({

  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type:String,
    require: true,
    unique: true
  },
  password: {
    type:String,
    require: true,
  },
  role: {
    tyep: String,
    required: true,
  },
  profile: {
    type: String,
  }
},

{
  timestamps: true
}

)


module.exports = new mongoose.model('users', userSchema);