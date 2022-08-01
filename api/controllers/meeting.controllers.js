// importing required packages and modules
const { logWarning, logError, logSuccess } = require(`../helpers/console.helpers`);

// importing response status codes
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, CONFLICT, SERVER_ERROR }, CLIENT_BASE_URL } = require(`../config`);

const { saveMeetingInDatabase, updateMeetingInfoInDatabase } = require(`../services/meeting.services`)

const { findUser } = require(`../services/user.services`);

const { meetingAlertEmail } = require(`../services/mail`)

const addMeeting = async (req, res) => {

  try{

    // searching if candidate exzits in the database or not by email
    var {status, data, error} = await findUser({email: req.body.candidateUserEmail})

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
      // unknown database error

      // logging error message to the console
      logError(`Requested operation failed.`);

      // returning the response with an error message
      return res.status(NOT_FOUND).json({

        hasError: true,
        message: `candidate user not found in the database.`,
        error: {
        }

      });

    }
    // adding candidate id in the meeting object 
    req.body.candidateId = data._id

    // saving the meeting in the database
    var {status, data, error} = await saveMeetingInDatabase(req.body, req.user);

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

    }

    // sending email to candidate for meeting alert
    meetingAlertEmail(req.body.candidateUserEmail, req.user, data)

    return res.status(SUCCESS).json({

      hasError: false,
      message: "Meeting Created Successfully",
      data: {
        data
      }

    })

  } catch(error){

    logError(`ERROR @ addJob`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: {
      
        error
      
      }

    })

  }

}

const updateMeetingById = async (req, res) => {

  try{

    const { _meetingId } = req.params;

    const  {status, data, error} = await updateMeetingInfoInDatabase(req.body, _meetingId);

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
      message: "Meeting Information Updated Successfully",
      data: {
        data
      }

    })
  
  
  } catch(error){

    logError(`ERROR @ updateMeetingById`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: {
      
        error
      
      }

    })

  }

}


module.exports = {

  addMeeting,
  updateMeetingById

}