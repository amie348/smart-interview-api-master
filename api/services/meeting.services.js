const { logWarning, logError, logInfo } = require(`../helpers/console.helpers`);

const MeetingModel = require(`../models/meeting.model`);

const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, UNAUTHORIZED,  FORBIDDEN, NOT_FOUND, CONFLICT, SERVER_ERROR } } = require(`../config`);


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

const updateMeetingInfoInDatabase =  async (meetingData, _meetingId) => {

  try {
   
    
      logInfo(`Info .. Updating Meeting Information `)
      
      // saving franchise in the database
      const result = await candidateModel.findOneAndUpdate({_id: _meetingId}, meetingData, {new: true});
      
      if(!result){
      
          // returning saved response to it's caller 
          return{
      
            status: NOT_FOUND,
            error: "meeting Not found"
        
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
    const [status, err] = [SERVER_ERROR,`Updating Meeting Information failed.`];
      
    logError(`ERROR @ updateMeetingInfoInDatabase `, err);
  

      // returning response to indicate failure to its caller
      return {
  
        status,
        error: err
  
      };
  
    }

}



module.exports = {

  saveMeetingInDatabase,
  updateMeetingInfoInDatabase

}