// importing mongoose module
const mongoose = require(`mongoose`)

// defininf Co-Ordinate Schema
const coordinateSchema = new mongoose.SChema({
    lat:{
        type: Number
    },
    long: {
        type: Number
    }
})
// exporting coordinateSchema as module
module.exports = {
    coordinateSchema
}