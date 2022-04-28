// importing required liberaries 
const mongoose = require('mongoose');
const { logSuccess, logInfo, logError } = require('./console.helpers');

// importing required config dependencies
const { MONGODB_ATLAS_CONNECTION_URI } = require(`../config.js`);


const connecDatabase = async () => {

  try{

    // setting config params in an object which will be passed
    // as a param to the connect function
    const connectionConfig = {

      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    };

    // making connection to the database
    await mongoose.connect(MONGODB_ATLAS_CONNECTION_URI, connectionConfig);

        // logging success messsage to the console
        logSuccess(`Database connection successful.`);


  } catch(error){
    // this code runs in case of an error @ runtime

    // logging the error messages to the console
    logError(`ERROR @ connectDatabase -> database.helpers.js`, error);


  }

}



// exporting functions as modules
module.exports = {

  connecDatabase

}