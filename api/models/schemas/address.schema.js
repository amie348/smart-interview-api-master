// importing mongoose sschema
// importing mongoose module
const mongoose = require(`mongoose`)



// importing Co-Ordinate Schema
const {coordinateSchema} = require(`./coordinates.schema`)

// defining Address Schema
const addressSchema = new mongoose.Schema({

    unitNo:{
        type: String
    },
    street: {
        type: String
    },
    city:{
        type:String
    },
    zip:{
        type:String
    },
    state:{
        type:String
    },
    coordinates: coordinateSchema

})


// exporting addresSchma as module
module.exports = {
    addressSchema
}