const bcrypt = require(`bcrypt`);

// importing required packages and modules
const { logWarning, logError } = require(`../../dependencies/helpers/console.helpers`);

// importing response status codes
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND, CONFLICT, SERVER_ERROR } } = require(`../../dependencies/config`);

// importing required jwt helpers 
const { createAccessToken, createRefreshToken, createActivationToken } = require(`../../dependencies/helpers/jwt.helpers`);

// importing required mail helpers
const { sendActivationEmail } = require("../../dependencies/external-services/mail");




const register = async (req, res) => {

  try{

    const {username, email, password, role, } = req.body;

    // hashing password
    const hashedPasswored = await bcrypt.hash(password, 12);

    console.log(`hashedPasswored`, hashedPasswored)

    // creating activation code
    const activationToken = await createAccessToken({username, hashedPasswored, role, email});

    console.log(`activationToken`, activationToken)

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



// exporting controllers as modules
module.exports = {

  register

}