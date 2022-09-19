// importing required packages and modules
const { logWarning, logError, logSuccess } = require(`../helpers/console.helpers`);

// importing response status codes
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, CONFLICT, SERVER_ERROR }, CLIENT_BASE_URL } = require(`../config`);

const { saveJobInDatabase, getJobsFromDatabase, updateJobInDatabase, deletJobFromDatabase, getApplicantsFromDataBAse, addMeetinginJobApplication, getSpecificJobById } = require(`../services/job.services`)
const { saveMeetingInDatabase } = require(`../services/meeting.services`)


const addJob = async (req, res) => {

  try{


    const  {status, data, error} = await saveJobInDatabase(req.body, req.user);

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
      message: "Job Created Successfully",
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

const getJobs = async(req, res) => {

  try{


    const  {status, data, error} = await getJobsFromDatabase(req.body, req.user);

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
      message: "Job Fetched Successfully",
      data: {
        data
      }

    })

  } catch(error){

    logError(`ERROR @ getJobs`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: {
      
        error
      
      }

    })

  }

}

const applyForJob = async(req, res) => {

  try{

    const updateQuery = {$push: {applications: {appliedBy : req.user._id, createdAt: new Date() }}}

    const {_jobId} = req.params

    const  {status, data, error} = await updateJobInDatabase(updateQuery, _jobId);


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
      message: "Applied Successfully",
      data: {
        data
      }

    })

  } catch(error){

    logError(`ERROR @ applyForJob`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: {
      
        error
      
      }

    })

  }

}

const getSpecificJob = async(req, res) => {

  try{

    const {_jobId} = req.params

    const  {status, data, error} = await getSpecificJobById(_jobId, req.user);


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
        error

      });

    }


    return res.status(SUCCESS).json({

      hasError: false,
      message: "Job Fetched Successfully",
      data: data

    })

  } catch(error){

    logError(`ERROR @ getSpecificJob`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: error

    })

  }

}

const updateSpecificJob = async(req, res) => {

  try{

    const {_jobId} = req.params

    const  {status, data, error} = await updateJobInDatabase(req.body, _jobId);


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
        error

      });

    }


    return res.status(SUCCESS).json({

      hasError: false,
      message: "Job Updated Successfully",
      data: data

    })

  } catch(error){

    logError(`ERROR @ updateSpecificJob`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: error

    })

  }

}

const deleteJob = async(req, res) => {

  try{

    const {_jobId} = req.params

    const  {status, data, error} = await deletJobFromDatabase(_jobId, req.user);


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
      message: "Job Deleted Successfully",
      data: {
        
      }

    })

  } catch(error){

    logError(`ERROR @ deleteJob`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: {
      
        error
      
      }

    })

  }

}

const getApplicantsOfSpecificJob = async(req, res) => {

  try{

    const {_jobId} = req.params

    const  {status, data, error} = await getApplicantsFromDataBAse(_jobId, req.user);


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
      message: "Applicants Fetched Successfully",
      data: {
        data 
      }

    })

  } catch(error){

    logError(`ERROR @ getApplicantsOfSpecificJob`, error)

    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: "internal server error occured",
      error: {
      
        error
      
      }

    })

  }

}

const ScheduleMeeting = async (req, res) => {

  try{

    const {_jobId, _applicationId} = req.params

    // adding candidate id in the meeting object 
    // req.body.candidateId = data._id

    // saving the meeting in the database
    var {status, data, error} = await saveMeetingInDatabase(req.body, req.user);

    var {status, data, error} = await addMeetinginJobApplication(_applicationId, _jobId,  data._id);




    // sending email to candidate for meeting alert
    // meetingAlertEmail(req.body.candidateUserEmail, req.user, data)

    return res.status(SUCCESS).json({

      hasError: false,
      message: "Meeting Scheduled Successfully",
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

module.exports =  {

  addJob,
  getJobs,
  deleteJob,
  getSpecificJob,
  updateSpecificJob,

  applyForJob,
  getApplicantsOfSpecificJob,
  ScheduleMeeting

}