const mongoose = require('mongoose')



const interviewerSchema = new mongoose.Schema({

    _userId: { type: mongoose.Schema.ObjectId, ref: 'user', unique: true },
    // posts: [{type: mongoose.Schema.ObjectId, ref: `Post`}],
    
    company: {type: mongoose.Schema.ObjectId, ref: `company`},
    
    age: {
      type : Number,
      default: 0 
    },

    city: {
      type : String,
      default: `` 
    },

    phoneNumber: {
      type : String,
      default: `` 
    },

    address: {
      type : String,
      default: `` 
    },


    education: {
        
        qualification: {
            type: String,
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
}, {
    timestamps: true
})



module.exports = mongoose.model(`Interviewer`, interviewerSchema);