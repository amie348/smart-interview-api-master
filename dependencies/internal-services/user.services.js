// importing required packages and modules
const mongoose = require(`mongoose`);
const { logWarning, logError } = require(`../helpers/console.helpers`);

// importing required config params
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, CONFLICT, SERVER_ERROR } } = require(`../config`);


const UserModel = require(`../../api/models/user.model`);

// this data service takes in user data obj and _creater, saves 
// user in database and returns response to it's caller 
const saveUser = async (userData) => {

    try {
    
    // creating object to store new User 
    const newUser = new UserModel({

      franchiseData
    
    });

    
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
    const [status, err] = [isDuplicateError ? CONFLICT : SERVER_ERROR, isDuplicateError ? `franchise creation failed due to duplicate ${duplicateErrorFields}.` : `franchise creation failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}