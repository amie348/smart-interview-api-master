// importing required packages and modules
const { logWarning, logError, logSuccess } = require(`../helpers/console.helpers`);

// importing response status codes
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, CONFLICT, SERVER_ERROR }, CLIENT_BASE_URL } = require(`../config`);

const { saveMeetingInDatabase, updateMeetingInfoInDatabase, getCandidateMeetingsFromDatabase, getInterviewerMeetingsFromDatabase, saveTestInDatabase, getQuizNamesFromDatabase, getInterviewerTestsFromDatabase, getSpecificTestFromDataBase, getCandidateTestsFromDatabase } = require(`../services/meeting.services`)

const { findUser, findCandidate } = require(`../services/user.services`);


const { meetingAlertEmail } = require(`../services/mail`)

const createTest = async(req, res) => {

  try{
    // saving the meeting in the database
    var {status, data, error} = await saveTestInDatabase(req.body, req.user);

    if(error) {

      logError("ERROR @ createTest ",error)

      return res.status(status).json({

        message: error

      })

    }

    return res.status(SUCCESS).json({

      hasError: false,
      message: "Quiz Created Successfully",
      data: data

    })

  } catch(error){

    logError(`ERROR @ createTest`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error

    })

  }

}

const getQuizNames = async(req, res) => {

  try{
    // saving the meeting in the database
    var {status, data, error} = await getQuizNamesFromDatabase(req.user);

    if(error) {

      logError("ERROR @ getQuizNames ",error)

      return res.status(status).json({

        message: error

      })

    }

    return res.status(SUCCESS).json({

      hasError: false,
      message: "Quiz Created Successfully",
      data: data

    })

  } catch(error){

    logError(`ERROR @ getQuizNames`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error

    })

  }

}

const getInterviewerTests = async(req, res) => {

  try{
    // saving the meeting in the database
    var {status, data, error} = await getInterviewerTestsFromDatabase(req.user);

    if(error) {

      logError("ERROR @ getInterviewerTests ",error)

      return res.status(status).json({

        message: error

      })

    }

    return res.status(SUCCESS).json({

      hasError: false,
      message: "Quizes Fetched Successfully",
      data: data

    })

  } catch(error){

    logError(`ERROR @ getInterviewerTests`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error

    })

  }

}


const addMeeting = async (req, res) => {

  try{

    // searching if candidate exzits in the database or not by email
    const user = await findUser({email: req.body.candidateUserEmail})
    
    // checking the result of the operation
    if (user.status === NOT_FOUND) {
      // this code runs in case data service failed due to
      // unknown database error

      // logging error message to the console
      logError(`Requested operation failed. Canddiate dose not exist`);

      // returning the response with an error message
      return res.status(NOT_FOUND).json({

        hasError: true,
        message: "Candidate User Dose not exist",

      });

    }

    const candidate = await findCandidate({_userId: user.data._id}) 

    if (candidate.status === NOT_FOUND) {
      // this code runs in case data service failed due to
      // unknown database error

      // logging error message to the console
      logError(`Requested operation failed. this user is not a candidate yet`);

      // returning the response with an error message
      return res.status(NOT_FOUND).json({

        hasError: true,
        message: "This user is not a candidate yet.",

      });

    }

    // adding candidate id in the meeting object 
    // req.body.candidateId = data._id

    // saving the meeting in the database
    const meeting = await saveMeetingInDatabase(req.body, req.user);

    const test = await getSpecificTestFromDataBase(req.body.test);

    // console.log(test,"test")

    // sending email to candidate for meeting alert
    meetingAlertEmail(req.body.candidateUserEmail, req.user, meeting.data, test.data)

    return res.status(SUCCESS).json({

      hasError: false,
      message: "Meeting Created Successfully",
      data: meeting

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

const getMeetingsForCandidate = async(req, res) => {

  try{


    const  {status, data, error} = await getCandidateMeetingsFromDatabase(req.body, req.user);

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
      message: "Meetings Fetched Successfully",
      data

    })

  } catch(error){

    logError(`ERROR @ getMeetingsForCandidate`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: {
      
        error
      
      }

    })

  }

}

const getMeetingsForInterviewer = async(req, res) => {

  try{


    const  {status, data, error} = await getInterviewerMeetingsFromDatabase(req.body, req.user);

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
      message: "Meetings Fetched Successfully",
      data: {
        data
      }

    })

  } catch(error){

    logError(`ERROR @ getMeetingsForInterviewer`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: {
      
        error
      
      }

    })

  }

}

const getTestsForCandidates = async (req, res) => {

  try{


    const  {status, data, error} = await getCandidateTestsFromDatabase(req.body, req.user);

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
        error: error

      });

    }

    return res.status(SUCCESS).json({

      hasError: false,
      message: "Tests Fetched Successfully",
      data

    })

  } catch(error){

    logError(`ERROR @ getTestsForCandidates`, error)

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

  createTest,
  getQuizNames,
  getInterviewerTests,
  getTestsForCandidates,


  addMeeting,
  updateMeetingById,
  getMeetingsForCandidate,
  getMeetingsForInterviewer

}