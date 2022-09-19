const ReportModel = require("../models/report.model");
const userModel = require("../models/user.model");
const Interviewer = require(`../models/interviewer.model`)
const Candidate = require(`../models/candidate.model`)
const MeetingModal= require(`../models/meeting.model`)
const mongoose = require(`mongoose`)


const createReportByMeetingId = async(req, res) => {

  try {


    const [{meetingId}, {scoredEmotions}] = [req.params, req.body];

    console.log(req.body)

    console.log("----------------------------------------------------------",scoredEmotions)

    //Emotions Section
    let angry = 0;
    let happy = 0;
    let neutral = 0;
    let fearful = 0;
    let disgusted = 0;
    let surprised = 0;
    let score = 0;
    let emotionsScore = 0;
    let emotionsPercentage = 0; 
    let chartData = [
      // ['Task', 'Hours per Day'],
      ['Happy', 0],
      ['Neutral', 5],
      ['Angry', 0],
      ['Surprised', 0.5],
      ['Fearful', 1],
      ['Disgusted', 0]
  ]

    if(scoredEmotions.length >0){  
        for ( i = 0 ; i< scoredEmotions?.length; i++){
            const individualExpression = scoredEmotions[i];
            if (individualExpression.expression === "neutral"){
                neutral = neutral + 1;
                score = score + 1;
            }
            if (individualExpression.expression === "happy"){
                happy = happy + 1;
                score = score + 1;
            }
            if (individualExpression.expression === "surprised"){
                surprised = surprised + 1;
                score = score + 0.5;
            }
            if (individualExpression.expression === "fearful"){
                fearful = fearful + 1;
            }
            if (individualExpression.expression === "disgusted"){
                disgusted = disgusted + 1;
            }
            if (individualExpression.expression === "angry"){
                angry = angry + 1;
            }
        }
        // emotions Score
        // console.log("score", score, (score/scoredEmotions.length))
        emotionsScore = (score/scoredEmotions.length) * 10;
        emotionsPercentage = (score/scoredEmotions.length) * 100;

        //chartData
        chartData = [
            ['Task', 'Hours per Day'],
            ['Happy', happy],
            ['Neutral', neutral],
            ['Angry', angry],
            ['Surprised', surprised],
            ['Fearful', fearful],
            ['Disgusted', disgusted]
          ]
        }
    

    //printing chartData, score and percentage of emotions
    console.log(chartData);
    console.log(emotionsScore);
    console.log(emotionsPercentage);
    

    // //Quiz Score Section
    let testPercentage;
    let meeting = await MeetingModal.findOne({_id: meetingId}).populate('madeBy').populate('test');
    
    if(!meeting) {
      return res.status(400).json({
        hasError: true,
        message: "Meeting not Found"
      });
    }

    testPercentage = (meeting?.test?.score/meeting?.test?.amount) * 100 ;
    //testPercentage
    console.log("Test Percentage: ", testPercentage)

    let pinForResult = meeting?.password;
    let emailForResult =  meeting?.candidate_user_email;

    let interviewerId = mongoose.Types.ObjectId(meeting?.madeBy?._id);
    let meetingID = mongoose.Types.ObjectId(meeting?._id);
    console.log("meetingId :", meetingId);
    console.log("interviewerId :", interviewerId);
    let interviewerName;
    const interviewer = await Interviewer.findOne({_id: mongoose.Types.ObjectId(interviewerId)}).populate('_userId').exec();
    if (!interviewer){
        interviewerName = "N/A";
    }

    interviewerName = interviewer?._userId?.username;
    const interviewerUser = interviewer?._userId;

    // //CV section
    let cvScore;
    const user = await userModel.findOne({email: meeting.candidateUserEmail}).exec();
        if(!user){
            cvScore = 0;
        }

        // console.log('user-------------', user)

    const candidate = await Candidate.findOne({_userId: mongoose.Types.ObjectId(user?._id)}).populate('_userId').exec();
        if (!candidate){
            cvScore = 0;
    }
    // console.log("candidate-----------------------", candidate)
    // str = str.replace(/\s+/g, '');
    let candidateUser = user;
    let candidateName = user?.username;
    let qualification = candidate?.education?.qualification.replace(/\s+/g, '')
    qualification = qualification.toLowerCase();
    console.log(qualification)
    if (qualification ===  "phd/doctrate"){
        cvScore = 100;
    }
    else if (qualification === "masters"){
        cvScore = 75;
    }
    else if (qualification === "becholars" || qualification === "pharm-d"){
        cvScore = 60;
    }
    else if (qualification === "mbbs/bds"){
        cvScore = 80;
    }
    else if (qualification === "m-phil"){
        cvScore = 85;
    }
    else if (qualification ===  "non-matriculation"){
        cvScore = 30;
    }
    else if (qualification ===  "matriculation/o-level"){
        cvScore = 40;
    }
    else if( qualification ===  "certification" || 
        qualification ===  "diploma" ||
        qualification ===  "shortcourse"
    ){
        cvScore = 50;
    }
    
    //cvPercentage
    const cvPercentage = cvScore;
    console.log(cvPercentage)
    
    // //overall_score
    let overall_score1 = +(emotionsPercentage) + (+testPercentage) + (+cvPercentage);
    let overall_score2 = overall_score1 / 300;
    let overall_score3 = overall_score2 * 100;
    const totalScore = overall_score3;


    console.log("emotions_percentage :", emotionsPercentage);
    console.log("testPercentage: ", testPercentage);
    console.log("cvPercentage :", cvPercentage)
    console.log("overall_score: ", totalScore);
    console.log("candidateName :", candidateName )
    console.log("interviewer_name :", interviewerName )
    console.log("meeting  :", meetingId )

    // let chartData_2 = [
    //     ['', 'Quiz', 'Emotions', 'CV'],
    //     [candidateName, testPercentage, emotions_percentage, cvPercentage]
    // ]
    //Update Meeting
    meeting = await MeetingModal.findOneAndUpdate({_id: mongoose.Types.ObjectId(meetingId)},{
        status: "ENDED"
    }).populate('madeBy');
    //     if(!meeting) res.status(400).json({msg: "Meeting not Found"});
    // console.log(meeting.ended)

    const report = new ReportModel ({
        interviewer : mongoose.Types.ObjectId(interviewer?._id),
        candidate: mongoose.Types.ObjectId(candidate?._id),
        interviewerName, candidateName,
        // candidate_user: mongoose.Types.ObjectId(candidate_user?._id), 
        // interviewer_user: mongoose.Types.ObjectId(interviewer_user?._id),
        meeting: meetingId,
        emotionsPercentage, testPercentage, cvPercentage, totalScore,
        chartData
        // chartData_2
    }) 

    await report.save(); 
    
    return res.status(201).json({

      hasError: false,
      message: "Report Created Successfull",
      data: report

    })

} catch (err) {

  console.log(err)

  return res.status(500).json({

    hasError: true,
    message: "Server Error"

  })

    // return res.status(500).json({msg: err.message})
}

}

const getSpecificReport = async (req, res) => {

  try{

    const {reportId} = req.params

    const report  = await ReportModel.findOne({_id: reportId, interviewer: req.user._interviewerId}).populate('meeting')

    if(!report) {

      return res.status(404).json({

        hasError: true,
        message: "Report Not found in databse"

      })

    }


    return res.status(200).json({

      hasError: false,
      message: "Report Fctched Successfully",
      data: report

    })

  }catch(error){

    return res.status(404).json({

      hasError: false,
      message: "Report Not found in databse"

    })

  }

}

const getReportsOfInterviewer = async (req, res) => {

  try{

    // const {reportId} = req.params

    console.log(req.user)

    const reports  = await ReportModel.find({interviewer: req.user._interviewerId}, {_id: 1, candidateName: 1, cvPercentage: 1, hired: 1, emotionsPercentage: 1, testPercentage: 1, totalScore: 1 });

    console.log("reports", reports)

    if(!reports) {

      return res.status(404).json({

        hasError: true,
        message: "Report Not found in databse"

      })

    }


    return res.status(200).json({

      hasError: false,
      message: "Reports Fctched Successfully",
      data: reports

    })

  }catch(error){

    return res.status(404).json({

      hasError: false,
      message: "Report Not found in databse"

    })

  }

}

const updateReportById = async (req, res) => {

  try{

    const {reportId} = req.params

    const report  = await ReportModel.findOneAndUpdate({_id:  reportId}, req.body, {new: true})

    if(!report) {

      return res.status(404).json({

        hasError: true,
        message: "Report Not found in databse"

      })

    }


    return res.status(200).json({

      hasError: false,
      message: "Report Updated Successfully",
      data: report

    })

  }catch(error){

    return res.status(404).json({

      hasError: false,
      message: "Report Not found in databse"

    })

  }

}


const deleteReportById = async(req, res) => {

  try{

    const {reportId} = req.params

    const result  = await ReportModel.deleteOne({_id:  reportId})


    return res.status(200).json({

      hasError: false,
      message: "Report Deleted Successfully",
      data: {}

    })

  }catch(error){

    return res.status(404).json({

      hasError: false,
      message: "Report Not found in databse"

    })

  }

}

module.exports = {

  createReportByMeetingId,
  getSpecificReport,
  getReportsOfInterviewer,
  updateReportById,
  deleteReportById

}