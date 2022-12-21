const { logWarning, logError, logInfo } = require(`../helpers/console.helpers`);

const MeetingModel = require(`../models/meeting.model`);
const testModel = require(`../models/test.model`);


const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, UNAUTHORIZED,  FORBIDDEN, NOT_FOUND, CONFLICT, SERVER_ERROR } } = require(`../config`);



const saveTestInDatabase = async (testData, user) => {

  try {
  
    testData.createdBy = user._id

    // creating object to store new meeting 
    const newTest = new testModel(testData);
    
    // saving meeting in the database
    const test = await newTest.save();


    // returning saved response to it's caller 
    return{

        status: CREATED,
        data: test
      
    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ saveTestInDatabase `, error);

    // setting value of status and description
    const [status, err] = [SERVER_ERROR, `test creation failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

const submitTestInDatabase = async (data, testId) => {

  try {
  
    const {questions} = await testModel.findOne({_id: testId}, {questions: 1});
    // console.log(questions)
    // console.log("-------------------------data")
    // console.log(data)

    var score = 0;

    let copyData = await questions.map(question => {
      let copyQuestion = {}
      
      data.map(element => {

        if(question._id == element._id){
          if(question.correct == element.answer) {
            score++;
          }
          copyQuestion = {statement: question.statement, options: question.options, correct:question.correct, _id: question._id, submitted: element.answer}
        }

      });


      return copyQuestion;

    })

    const result = await testModel.findOneAndUpdate({_id: testId}, {"$set": {questions : copyData, score : score, attempted: true}}, {new: true})

    console.log(result)

    // returning saved response to it's caller 
    return{

        status: SUCCESS,
        data: {}
      
    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ submitTestInDatabase `, error);

    // setting value of status and description
    const [status, err] = [SERVER_ERROR, `tests fetching failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

const updateTestInfoInDatabase =  async (testId, testData) => {

  try {
        
      // saving franchise in the database
      const result = await testModel.findOneAndUpdate({_id: testId, attempted: false}, testData, {new: true});
      
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
      
    logError(`ERROR @ updateTestInfoInDatabase `, err);
  

      // returning response to indicate failure to its caller
      return {
  
        status,
        error: err
  
      };
  
    }

}

const deleteTestInfoInDatabase =  async (testId, testData) => {

  try {
        
      // saving franchise in the database
      const result = await testModel.deleteOne({_id: testId, attempted: false});
      
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
          data: {}
      
      };
  
    } catch (error) {
      // this code runs in case of an error @ runtime
  
      // setting value of status and description
    const [status, err] = [SERVER_ERROR,`Updating Meeting Information failed.`];
      
    logError(`ERROR @ deleteTestInfoInDatabase `, err);
  

      // returning response to indicate failure to its caller
      return {
  
        status,
        error: err
  
      };
  
    }

}

const getQuizNamesFromDatabase = async (user) => {

  try {
  
    let tests = await testModel.find({createdBy: user._id}, {title: 1, _id: 1});


    if(tests){
      tests = tests.map(test => ({value: test._id, label : test.title}))
    }



    // returning saved response to it's caller 
    return{

        status: SUCCESS,
        data: tests
      
    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ getQuizNamesFromDatabase `, error);

    // setting value of status and description
    const [status, err] = [SERVER_ERROR, `test fetching failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

const getInterviewerTestsFromDatabase = async (user) => {

  try {
  
    const tests = await testModel.find({createdBy: user._id});


    // returning saved response to it's caller 
    return{

        status: SUCCESS,
        data: tests
      
    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ getInterviewerTestsFromDatabase `, error);

    // setting value of status and description
    const [status, err] = [SERVER_ERROR, `tests fetching failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

const getSpecificTestFromDataBase = async (_testId) => {

  try {
  
    const test = await testModel.findOne({_id: _testId});


    // returning saved response to it's caller 
    return{

        status: SUCCESS,
        data: test
      
    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ getSpecificTestFromDataBase `, error);

    // setting value of status and description
    const [status, err] = [SERVER_ERROR, `test fetching failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

const getCandidateTestsFromDatabase = async (query, user) => {

  try {

    // let searchFilters = { }

    // console.log(user)
    let filters = {candidateUserEmail: user.email}

    console.log(filters)

    // if(user._interviewerId){

    //     filters.postedBy = user._interviewerId
    
    // } else if(user.candidate) {
    
    //     searchFilters.skills = user.candidate.skills
    
    // }

    // looping through all filters to modify them according
    // to the query syntax requirements
    // for (const filter in searchFilters) {

    //   switch (filter) {

    //     case `skills`: {

    //       let skills = []

    //       searchFilters[`skills`].forEach(element => {
    //         skills.push(new RegExp(element, `i`))
          
    //       });

    //       filters[`skills`] = {$in : [...skills]}

            

    //       break;

    //     }      
    //     default: {


    //       continue;

    //     }

    //   }

    // }


    // querying database for user
    
    
    var tests = await MeetingModel.find(filters, {_id: 1, test: 1,}).populate(`test`)


    tests = tests.map(test => test.test)
    

    if(!tests){

      return {

        status: NOT_FOUND,
        error: `No Meetings Found`

      }

    }


    // returning saved system permissions to its caller
    return {

      status: SUCCESS,
      data: tests

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ getCandidateTestsFromDatabase -> user.services.js`, error);

    // returning response to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: `Unhandled exception occured on the server.`

    };

  }

}

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

const deleteSpecificMeetingById = async (meetingId, user) => {

  try {
  
    // meetingData.madeBy = user._interviewerId

    // console.log(meetingId, user._interviewerId)

    const result = await MeetingModel.deleteOne({_id: meetingId, madeBy: user._interviewerId})

    // returning saved response to it's caller 
    return{

        status: CREATED,
        data: {}
      
    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ deleteSpecificMeetingById `, error);

    // setting value of status and description
    const [status, err] = [SERVER_ERROR, `meeting creation failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

const deleteSpecificTestById = async (testId) => {

  try {
  
    const result = await testModel.deleteOne({_id: testId})

    // returning saved response to it's caller 
    return{

        status: CREATED,
        data: {}
      
    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ deleteSpecificTestById `, error);

    // setting value of status and description
    const [status, err] = [SERVER_ERROR, `meeting creation failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

const getSpecificMeetingById = async (query) => {

  try {

    const meeting = await MeetingModel.findOne(query).populate('test', 'title pin time questions attempted')

    if(!meeting){

      return {

        status: NOT_FOUND,
        error: `Meeting Not Found`

      }

    }


    // returning saved system permissions to its caller
    return {

      status: SUCCESS,
      data: meeting

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ getSpecificMeetingById -> user.services.js`, error);

    // returning response to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: `Unhandled exception occured on the server.`

    };

  }

}

const updateMeetingInfoInDatabase =  async (meetingData, _meetingId) => {

  try {
   
    
      logInfo(`Info .. Updating Meeting Information `)
      
      // saving franchise in the database
      const result = await MeetingModel.findOneAndUpdate({_id: _meetingId}, meetingData, {new: true});
      
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

const getCandidateMeetingsFromDatabase = async (query, user) => {

  try {

    // let searchFilters = { }

    // console.log(user)
    let filters = {candidateUserEmail: user.email}

    console.log(filters)

    // if(user._interviewerId){

    //     filters.postedBy = user._interviewerId
    
    // } else if(user.candidate) {
    
    //     searchFilters.skills = user.candidate.skills
    
    // }

    // looping through all filters to modify them according
    // to the query syntax requirements
    // for (const filter in searchFilters) {

    //   switch (filter) {

    //     case `skills`: {

    //       let skills = []

    //       searchFilters[`skills`].forEach(element => {
    //         skills.push(new RegExp(element, `i`))
          
    //       });

    //       filters[`skills`] = {$in : [...skills]}

            

    //       break;

    //     }      
    //     default: {


    //       continue;

    //     }

    //   }

    // }


    // querying database for user
    
    
    const meetings = await MeetingModel.find(filters)
    .populate({path: `madeBy`, 
              select:`_userId`, 
              populate: { path:`_userId`, 
                          select: `username email`
                        }, 
              populate: { path:`company`, 
                      select: `companyName`
                      }, 
            
              });

    

    if(!meetings){

      return {

        status: NOT_FOUND,
        error: `No Meetings Found`

      }

    }


    // returning saved system permissions to its caller
    return {

      status: SUCCESS,
      data: meetings

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ getCandidateMeetingsFromDatabase -> user.services.js`, error);

    // returning response to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: `Unhandled exception occured on the server.`

    };

  }

}

const getInterviewerMeetingsFromDatabase = async (query, user) => {

  try {

    // let searchFilters = { }
    let filters = {madeBy: user._interviewerId}

    // if(user._interviewerId){

    //     filters.postedBy = user._interviewerId
    
    // } else if(user.candidate) {
    
    //     searchFilters.skills = user.candidate.skills
    
    // }

    // looping through all filters to modify them according
    // to the query syntax requirements
    // for (const filter in searchFilters) {

    //   switch (filter) {

    //     case `skills`: {

    //       let skills = []

    //       searchFilters[`skills`].forEach(element => {
    //         skills.push(new RegExp(element, `i`))
          
    //       });

    //       filters[`skills`] = {$in : [...skills]}

            

    //       break;

    //     }      
    //     default: {


    //       continue;

    //     }

    //   }

    // }


    // querying database for user
    
    
    const meetings = await MeetingModel.find(filters)

    //.populate(`test`, `titlle _id attempted`);

    if(!meetings){

      return {

        status: NOT_FOUND,
        error: `No Meetings Found`

      }

    }


    // returning saved system permissions to its caller
    return {

      status: SUCCESS,
      data: meetings

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ getCandidateMeetingsFromDatabase -> user.services.js`, error);

    // returning response to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: `Unhandled exception occured on the server.`

    };

  }

}


module.exports = {

  saveTestInDatabase,
  getQuizNamesFromDatabase,
  getSpecificTestFromDataBase,
  getInterviewerTestsFromDatabase,
  getCandidateTestsFromDatabase,
  submitTestInDatabase,
  submitTestInDatabase,
  updateTestInfoInDatabase,
  deleteTestInfoInDatabase,
  deleteSpecificTestById,


  saveMeetingInDatabase,
  getSpecificMeetingById,
  updateMeetingInfoInDatabase,
  getCandidateMeetingsFromDatabase,
  getInterviewerMeetingsFromDatabase,
  deleteSpecificMeetingById

}