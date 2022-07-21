const bcrypt = require(`bcrypt`);

// importing required packages and modules
const { logWarning, logError, logSuccess } = require(`../helpers/console.helpers`);

// importing response status codes
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, CONFLICT, SERVER_ERROR }, CLIENT_BASE_URL } = require(`../config`);

const { saveJobInDatabase, getJobsFromDatabase, updateJobInDatabase, deletJobFromDatabase } = require(`../services/job.services`)



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

    const updateQuery = {$push: {appliedBy : req.user.candidate._id}}

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



module.exports =  {

  addJob,
  getJobs,
  deleteJob,
  applyForJob

}