// importing required liberaries for setup
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { logSuccess, logInfo, logWarning, logError } = require(`./api/helpers/console.helpers`);

// impirtng database functions
const { connecDatabase } = require('./api/helpers/database.helper');

// importing required config params
const { APP_MODE, NODE_PORT } = require(`./api/config`);

// importing required routers
const { userRouter } = require(`./api/routes/use.router`);
const { jobRouter } = require(`./api/routes/job.router`)


// creatig express server by calling express constructor 
const server = express();



// initializing seerver 
(async() => {

  try{

		// making databse connection
  	await connecDatabase();

    // Listening requests on the specified PORT
		server.listen(NODE_PORT, logInfo(`Initializing server in ${APP_MODE} mode. Please wait.`));

    // 1-> middleware for handling cors
    // 2-> middleware to log requests to the console
    // 3-> middleware to parse json request body
    // 4-> middleware to parse urlencoded request data
    server.use(cors());
    server.use(morgan(`dev`));
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));

    // api handlers
		server.use(`/api/user`, userRouter)
    server.use(`/api/job`, jobRouter)


		// logging message to the console
		logInfo(`Server is running @ port ${NODE_PORT}.`);

  } catch(error){
		// this code runs in case of an ERROR @ runtime

    // logging error message to the console
    logError(`ERROR @ Server Initialization Process.`, error);

  }

})();