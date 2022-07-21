const { logWarning, logError, logInfo } = require(`../helpers/console.helpers`);

const MeetingModel = require(`../models/meeting.model`);



// this data service takes in user data obj and _creater, saves 
// user in database and returns response to it's caller 
const saveMeetingInDatabase = async (meetingData, user) => {

  try {
  
    meetingData.madeBy = user._interviewerId

    // creating object to store new meeting 
    const newMeeting = new MeetingModel(meetingData);

    
    // saving meeting in the database
    const meeting = await newMeeting.save();


    // returning saved response to it's caller 
    return{

        status: CREATED,
        data: meeting
      
    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ saveMeetingInDatabase `, error);

    // setting value of status and description
    const [status, err] = [SERVER_ERROR, `meeting creation failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}



module.exports = {

  saveMeetingInDatabase

}