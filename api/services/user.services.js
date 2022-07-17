// importing required packages and modules
const { logWarning, logError, logInfo } = require(`../helpers/console.helpers`);

const UserModel = require(`../models/user.model`);
const candidateModel = require(`../models/candidate.model`);
const interviewerModel = require(`../models/interviewer.model`)
const bcrypt = require(`bcrypt`);


// importing required config params
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, UNAUTHORIZED,  FORBIDDEN, NOT_FOUND, CONFLICT, SERVER_ERROR } } = require(`../config`);



// this data service takes in user data obj and _creater, saves 
// user in database and returns response to it's caller 
const saveUser = async (userData) => {

    try {
    
    // creating object to store new User 
    const newUser = new UserModel(userData);

    
    // saving franchise in the database
    const result = await newUser.save();


    // returning saved response to it's caller 
    return{

        status: CREATED,
        data: result
    
    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ saveFranchise -> franchise.services.js`, error);

    // checking if the error stems from duplicate value in database
    const isDuplicateError = error && error.code === 11000;

    // fetching fields which caused duplication error
    const duplicateErrorFields = (Object.keys(error.keyValue)).join(`, `);

    // setting value of status and description
    const [status, err] = [isDuplicateError ? CONFLICT : SERVER_ERROR, isDuplicateError ? `user creation failed due to duplicate ${duplicateErrorFields}.` : `user creation failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

const findUser = async (userData) => {

  try{

    console.log(userData)

    const user = await UserModel.findOne({_id: userData._id}).lean().exec();


    if(!user){

      return {
      
        status: NOT_FOUND,
        error: "User dose not exist in database."
      
      }

    }

    
    return {
      status: SUCCESS,
      data: user
    }

  } catch(error) {


    logError(`ERROR @ error while finding user`, error);

    throw(error)

  }

}

const getUser = async (userData) => {

  try {

    console.log(userData)

    // querying database for user
    const result = await UserModel.findOne({email: userData.email})

    const verify = await bcrypt.compare(userData.password, result.password)


    if(!verify){

      return  {

        status: UNAUTHORIZED,
        error: "Password is Incorect"

      }

    }

    if(!result){

      return {

        status: NOT_FOUND,
        error: `User Not found in data`

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
    logError(`ERROR @ getUser -> user.services.js`, error);

    // returning response to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: `Unhandled exception occured on the server.`

    };

  }

}

const addCandidateInfoInDatabase =  async (candidateData, user) => {

  try {
  
      // creating object to store new User 
      const newCandidate = new candidateModel({
          _userId: user._id,
          ...candidateData
      });
  
      logInfo(`Info .. Adding Candidate Information `)
      
      // saving franchise in the database
      const result = await newCandidate.save();
  
  
      // returning saved response to it's caller 
      return{
  
          status: CREATED,
          data: result
      
      };
  
    } catch (error) {
      // this code runs in case of an error @ runtime
  
      // logging error messages to the console
      
    // checking if the error stems from duplicate value in database
    const isDuplicateError = error && error.code === 11000;

    // fetching fields which caused duplication error
    const duplicateErrorFields = (Object.keys(error.keyValue)).join(`, `);

    // setting value of status and description
    const [status, err] = [isDuplicateError ? CONFLICT : SERVER_ERROR, isDuplicateError ? `Adding candidate information failed due to duplicate ${duplicateErrorFields}.` : `Adding Candidate Information failed.`];
      
    logError(`ERROR @ addCandidateInfoInDatabase `, err);
  

      // returning response to indicate failure to its caller
      return {
  
        status,
        error: err
  
      };
  
    }

}

const updateCandidateInfoInDatabase =  async (candidateData, _candidateId, user) => {

  try {
   
    
      logInfo(`Info .. Updating Candidate Information `)
      
      // saving franchise in the database
      const result = await candidateModel.findOneAndUpdate({_id: _candidateId, _userId: user._id}, candidateData, {new: true});
      
      if(!result){
      
          // returning saved response to it's caller 
          return{
      
            status: NOT_FOUND,
            error: "candidate Not found"
        
        };

      }

      console.log("success")
  
  
      // returning saved response to it's caller 
      return{
  
          status: SUCCESS,
          data: result
      
      };
  
    } catch (error) {
      // this code runs in case of an error @ runtime
  
      // setting value of status and description
    const [status, err] = [SERVER_ERROR,`Updating Candidate Information failed.`];
      
    logError(`ERROR @ updateCandidateInfoInDatabase `, err);
  

      // returning response to indicate failure to its caller
      return {
  
        status,
        error: err
  
      };
  
    }

}

const findCandidate = async (_candidateId) => {

  try{

    const candidate = await candidateModel.findOne({_id: _candidateId}).lean().exec();


    if(!candidate){

      return {
      
        status: NOT_FOUND,
        error: "candidate dose not exist in database."
      
      }

    }

    
    return {
      status: SUCCESS,
      data: user
    }

  } catch(error) {


    logError(`ERROR @ error while finding user`, error);

    throw(error)

  }

}

const addInterviewerInfoInDatabase =  async (interviewerData, user) => {

  try {
  
      // creating object to store new User 
      const newInterviewer = new interviewerModel({
          _userId: user._id,
          ...interviewerData
      });
  
      logInfo(`Info .. Adding Interviewer Information `)
      
      // saving franchise in the database
      const result = await newInterviewer.save();
  
  
      // returning saved response to it's caller 
      return{
  
          status: CREATED,
          data: result
      
      };
  
    } catch (error) {
      // this code runs in case of an error @ runtime
  
      // logging error messages to the console
      
    // checking if the error stems from duplicate value in database
    const isDuplicateError = error && error.code === 11000;

    // fetching fields which caused duplication error
    const duplicateErrorFields = (Object.keys(error.keyValue)).join(`, `);

    // setting value of status and description
    const [status, err] = [isDuplicateError ? CONFLICT : SERVER_ERROR, isDuplicateError ? `Adding interviewer information failed due to duplicate ${duplicateErrorFields}.` : `Adding INterviewer Information failed.`];
      
    logError(`ERROR @ addInterviewerInfoInDatabase `, err);
  

      // returning response to indicate failure to its caller
      return {
  
        status,
        error: err
  
      };
  
    }

}

const updateInterviewerInfoInDatabase =  async (interviewerData, _interviewerId, user) => {

  try {
   
    
      logInfo(`Info .. Updating Interviewer Information `)
      
      const result = await interviewerModel.findOneAndUpdate({_id: _interviewerId, _userId: user._id}, interviewerData, {new: true});
      
      if(!result){
      
          // returning saved response to it's caller 
          return{
      
            status: NOT_FOUND,
            error: "interview Not found"
        
        };

      }

  
      // returning saved response to it's caller 
      return{
  
          status: SUCCESS,
          data: result
      
      };

    } catch (error) {
      // this code runs in case of an error @ runtime
  
      // setting value of status and description
    const [status, err] = [SERVER_ERROR,`Updating Interviewer Information failed.`];
      
    logError(`ERROR @ updateInterviewerInfoInDatabase `, err);
  

      // returning response to indicate failure to its caller
      return {
  
        status,
        error: err
  
      };
  
    }

}

module.exports = {

  getUser,
  findUser,
  saveUser,

  findCandidate,
  addCandidateInfoInDatabase,
  updateCandidateInfoInDatabase,
  
  addInterviewerInfoInDatabase,
  updateInterviewerInfoInDatabase

}