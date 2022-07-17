const jwt = require(`jsonwebtoken`);

// importing response status codes
const { HTTP_STATUS_CODES: { BAD_REQUEST, SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } } = require(`../config`);

// importing required packages and modules
const { logWarning, logError, logSuccess } = require(`../helpers/console.helpers`);

const { ACTIVATION_TOKEN_SECRET_KEY, ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require(`../credentials`)

const { findUser, findCandidate } = require(`../services/user.services`);


const decodeActivationToken = async(req,res, next) => {

  try{

    const { activationToken } = req.params;

    const tokenData = await jwt.verify(activationToken, ACTIVATION_TOKEN_SECRET_KEY);
    
    if(!tokenData) {

      logError(`ERROR while activating user`);

      return res.status(BAD_REQUEST).json({
  
        hasError: true,
        message: `error. requested operation failed`,
        error: {
  
          error: `Invalid Activation Token`
  
        }
  
      })

    }

    req.tokenData = tokenData;

    next()

  }
  catch(error){

    logError(`ERROR while registering a new user`, error);

    res.status(SERVER_ERROR).json({

      hasError: true,
      message: `error. requested operation failed`,
      error: {

        error: `An unhandled exception occured on the server.`

      }

    })

  }

}

const authenticateUser = async(req,res, next) => {

  try{

    const accessToken = req.headers.authorization.split(" ")[1];

    if(!accessToken){

      return res.status(UNAUTHORIZED).json({

        hasError: true,
        message: "You are not authorized"

      })

    }

    const tokenData = await jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);

    if(!tokenData) {

      logError(`ERROR while activating user`);

      return res.status(BAD_REQUEST).json({
  
        hasError: true,
        message: `error. requested operation failed`,
        error: {
  
          error: `Invalid Activation Token`
  
        }
  
      })

    }

    const {status, data, error} = await findUser(tokenData);

    if(status === NOT_FOUND){

      logError(`ERROR: user not found in database while authenticating`)

      return res.status(NOT_FOUND).json({

        hasError: true,
        messatge: error

      })

    } 

    req.user = data;

    next()

  }
  catch(error){

    logError(`ERROR while registering a new user`, error);

    res.status(SERVER_ERROR).json({

      hasError: true,
      message: `error. requested operation failed`,
      error: {

        error: `An unhandled exception occured on the server.`

      }

    })

  }

}



module.exports = {

  decodeActivationToken,
  authenticateUser

}