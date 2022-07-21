// importing required packages and modules
const { logWarning, logError, logInfo } = require(`../helpers/console.helpers`);
const mongoose = require(`mongoose`)


const JobModel = require(`../models/jobs.model`);


// importing required config params
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, UNAUTHORIZED,  FORBIDDEN, NOT_FOUND, CONFLICT, SERVER_ERROR } } = require(`../config`);



// this data service takes in user data obj and _creater, saves 
// user in database and returns response to it's caller 
const saveJobInDatabase = async (jobData, user) => {

  try {
  
    jobData.postedBy = user._interviewerId

    // creating object to store new User 
    const newJob = new JobModel(jobData);

    
    // saving franchise in the database
    const job = await newJob.save();


    // returning saved response to it's caller 
    return{

        status: CREATED,
        data: job
    
    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ saveJobInDatabase `, error);

    // setting value of status and description
    const [status, err] = [SERVER_ERROR, `user creation failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

const getJobsFromDatabase = async (body,user) => {

  try {

    let searchFilters = { }
    let filters = {}

    if(user._interviewerId){

        filters.postedBy = user._interviewerId
    
    } else if(user.candidate) {
    
        searchFilters.skills = user.candidate.skills
    
    }

    // looping through all filters to modify them according
    // to the query syntax requirements
    for (const filter in searchFilters) {

      switch (filter) {

        case `skills`: {

          let skills = []

          searchFilters[`skills`].forEach(element => {
            skills.push(new RegExp(element, `i`))
          
          });

          filters[`skills`] = {$in : [...skills]}

            

          break;

        }      
        default: {


          continue;

        }

      }

    }


    // querying database for user
    
    
    const jobs = await JobModel.find(filters).lean().exec();

    if(!jobs){

      return {

        status: NOT_FOUND,
        error: `No Jobs Found`

      }

    }


    // returning saved system permissions to its caller
    return {

      status: SUCCESS,
      data: jobs

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ getUser -> user.services.js`, error);

    // returning response to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: `Unhandled exception occured on the server.`

    };

  }

}

const updateJobInDatabase = async (updateQuery, _jobId) => {

  try {
    
    const job = await JobModel.findOneAndUpdate({_id: _jobId}, updateQuery);

    if(!job){

      return {

        status: NOT_FOUND,
        error: `Job Not Found`

      }

    }


    // returning saved system permissions to its caller
    return {

      status: SUCCESS,
      data: job

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ updateJobInDatabase `, error);

    // returning response to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: `Unhandled exception occured on the server.`

    };

  }

}

const deletJobFromDatabase = async (_jobId, user) => {

  try {
    
    const result = await JobModel.findOneAndDelete({_id: _jobId, postedBy: user._interviewerId});


    if(!result){

      return {

        status: NOT_FOUND,
        error: `Job Not Found`

      }

    }


    // returning saved system permissions to its caller
    return {

      status: SUCCESS,
      data: result

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ deletJobFromDatabase `, error);

    // returning response to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: `Unhandled exception occured on the server.`

    };

  }

}



module.exports = {

  saveJobInDatabase,
  getJobsFromDatabase,
  updateJobInDatabase,
  deletJobFromDatabase

}