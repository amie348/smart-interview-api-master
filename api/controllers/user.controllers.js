const bcrypt = require(`bcrypt`);

// importing required packages and modules
const { logWarning, logError, logSuccess } = require(`../helpers/console.helpers`);

// importing response status codes
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, CONFLICT, SERVER_ERROR, FORBIDDEN }, CLIENT_BASE_URL } = require(`../config`);

// importing required jwt helpers 
const { createAccessToken, createRefreshToken, createActivationToken } = require(`../helpers/jwt.helpers`);

// importing required mail helpers
const { sendActivationEmail } = require("../services/mail");

const { saveUser, getUser, addCandidateInfoInDatabase, updateCandidateInfoInDatabase, addInterviewerInfoInDatabase, updateInterviewerInfoInDatabase, addCompanyInfoInDatabase, updateCompanyInfoInDatabase } = require(`../services/user.services`)


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

    const user = {_id : data._id, email: data.email, username: data.username, role: data.role}

    

    const token = await createAccessToken(user)

    // returning the response with success message
    return res.status(CREATED).json({

      hasError: false,
      message: `SUCCESS: Requested operation successful.`,
      data: {

        user,
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

const login = async (req, res) => {

  try{

    const { email, password } = req.body;


    const {status, data, error } = await getUser({email, password})



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

    } else if (status === NOT_FOUND) {
      // this code runs in case data service failed due to
      // duplication value

      // logging error message to the console
      logError(`User NOt found in database.`);

      // returning the response with an error message
      return res.status(NOT_FOUND).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error

        }

      });

    }else if (status === FORBIDDEN) {
      // this code runs in case data service failed due to
      // duplication value

      // logging error message to the console
      logError(error);

      // returning the response with an error message
      return res.status(FORBIDDEN).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error

        }

      });

    }


    const user = {_id : data._id, email: data.email, username: data.username, role: data.role}


    const accessToken = createAccessToken(user);


    logSuccess(`Requested Operation Completed. User Logged inn successfully`);


    res.status(SUCCESS).json({

      hasError: false,
      message: `Logged In Successully`,
      data: {
    
        user,
        accessToken
    
      },

    })


  } catch(error) {

    logError(`ERROR while loging user in`, error)

    res.status(SERVER_ERROR).json({

      hasError: true,
        message: `error. requested operation failed`,
        error: {

          error: `An unhandled exception occured on the server.`

        }

    })

  }

}

const addCandidateInfo = async (req, res) => {

  try{

    const  {status, data, error} = await addCandidateInfoInDatabase(req.body, req.user);

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

    return res.status(CREATED).json({

      hasError: false,
      message: "Candidate Information Added Successfully",
      data: {
        data
      }

    })

  } catch(error){

    logError(`ERROR @ addCandidateInfo`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: {
      
        error
      
      }

    })

  }

}

const updateCandidateInfoById = async (req, res) => {

  try{

    const { _candidateId } = req.params;

    const  {status, data, error} = await updateCandidateInfoInDatabase(req.body, _candidateId, req.user);

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

    return res.status(SUCCESS).json({

      hasError: false,
      message: "Candidate Information Added Successfully",
      data: {
        data
      }

    })
  
  
  } catch(error){

    logError(`ERROR @ addCandidateInfo`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: {
      
        error
      
      }

    })

  }

}

const addInterviewerInfo = async (req, res) => {

  try{

    const  {status, data, error} = await addInterviewerInfoInDatabase(req.body, req.user);

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

    return res.status(SUCCESS).json({

      hasError: false,
      message: "INterviewer Information Added Successfully",
      data: {
        data
      }

    })

  } catch(error){

    logError(`ERROR @ addCandidateInfo`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: {
      
        error
      
      }

    })

  }

}

const updateInterviewerInfoById = async (req, res) => {

  try{

    const { _interviewerId } = req.params;

    const  {status, data, error} = await updateInterviewerInfoInDatabase(req.body, _interviewerId, req.user);

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

    return res.status(SUCCESS).json({

      hasError: false,
      message: "Interviewer Information Updated Successfully",
      data: {
        data
      }

    })
  
  
  } catch(error){

    logError(`ERROR @ addCandidateInfo`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: {
      
        error
      
      }

    })

  }

}

const addCompanyInfo = async (req, res) => {

  try{

    const  {status, data, error} = await addCompanyInfoInDatabase(req.body, req.user);

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

    return res.status(SUCCESS).json({

      hasError: false,
      message: "Company Information Added Successfully",
      data: {
        data
      }

    })

  } catch(error){

    logError(`ERROR @ addCandidateInfo`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: {
      
        error
      
      }

    })

  }

}

const updateCompanyInfoById = async (req, res) => {

  try{

    const { _companyId } = req.params;

    const  {status, data, error} = await updateCompanyInfoInDatabase(req.body, _companyId, req.user);

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

    return res.status(SUCCESS).json({

      hasError: false,
      message: "Company Information Updated Successfully",
      data: {
        data
      }

    })
  
  
  } catch(error){

    logError(`ERROR @ updateCompanyInfoById`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: {
      
        error
      
      }

    })

  }

}

// exporting controllers as modules
module.exports = {

  login,
  activate,
  register,
  
  addCandidateInfo,
  updateCandidateInfoById,
  
  addInterviewerInfo,
  updateInterviewerInfoById,
  
  addCompanyInfo,
  updateCompanyInfoById

}
