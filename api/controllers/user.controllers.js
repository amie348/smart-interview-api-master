const bcrypt = require(`bcrypt`);

// importing required packages and modules
const { logWarning, logError, logSuccess } = require(`../../dependencies/helpers/console.helpers`);

// importing response status codes
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND, CONFLICT, SERVER_ERROR }, CLIENT_BASE_URL } = require(`../../dependencies/config`);

// importing required jwt helpers 
const { createAccessToken, createRefreshToken, createActivationToken } = require(`../../dependencies/helpers/jwt.helpers`);

// importing required mail helpers
const { sendActivationEmail } = require("../../dependencies/external-services/mail");

const { saveUser } = require(`../../dependencies/internal-services/user.services`)


const register = async (req, res) => {

  try{

    const {username, email, password, role, } = req.body;

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 12);

    // creating activation code
    const activationToken = await createActivationToken({username, [`password`]: hashedPassword, role, email});

    let url = `${CLIENT_BASE_URL}/user/activate?activation_token=${activationToken}`

    sendActivationEmail(email, url, `Confirm By Email`)

    logSuccess(`Confirmation Mail Sent Through Mail`)

    res.status(SUCCESS).json({

      hasError: false,
      message: "Confirmation mail sent to your email"

    })

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

const activate = async (req,res) => {

  try{

    const { status, data, error } = await saveUser(req.tokenData);

    const user = {_id : data._id, email: data.email, username: data.username, role: data.role}

    // checking the result of the operation
    if (status === SERVER_ERROR) {
      // this code runs in case data service failed due to
      // unknown database error

      // logging error message to the console
      logError(`Requested operation failed. Unknown database error.`);

      // returning the response with an error message
      return res.status(SERVER_ERROR).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error

        }

      });

    } else if (status === CONFLICT) {
      // this code runs in case data service failed due to
      // duplication value

      // logging error message to the console
      logError(`Requested operation failed. User with duplicate field(s) exists.`);

      // returning the response with an error message
      return res.status(CONFLICT).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error

        }

      });

    }

    const token = await createAccessToken(user)

    // returning the response with success message
    return res.status(CREATED).json({

      hasError: false,
      message: `SUCCESS: Requested operation successful.`,
      data: {

        data : {...user},
        token

      }

    });

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

  register,
  activate

}