// importing required packages and modules
const { logWarning, logError, logSuccess } = require(`../helpers/console.helpers`);

// importing response status codes
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, CONFLICT, SERVER_ERROR }, CLIENT_BASE_URL } = require(`../config`);

const { saveMeetingInDatabase } = require(`../services/meeting.services`)

const addMeeting = async (req, res) => {

  try{

    const  {status, data, error} = await saveMeetingInDatabase(req.body, req.user);

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



module.exports = {

  addMeeting

}