const jwt = require(`jsonwebtoken`);

// importing response status codes
const { HTTP_STATUS_CODES: { BAD_REQUEST, SERVER_ERROR } } = require(`../../dependencies/config`);

// importing required packages and modules
const { logWarning, logError, logSuccess } = require(`../../dependencies/helpers/console.helpers`);

const { ACTIVATION_TOKEN_SECRET_KEY, ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require(`../../dependencies/credentials`)

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



module.exports = {

  decodeActivationToken

}