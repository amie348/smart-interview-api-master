const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const { 
  GOOGLE_APP_CLIENT_ID,
  GOOGLE_APP_CLIENT_SECRET,
  GOOGLE_APP_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS
} = require(`../credentials`);

const oauth2Client = new OAuth2 (
  GOOGLE_APP_CLIENT_ID,
  GOOGLE_APP_CLIENT_SECRET,
  GOOGLE_APP_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
)


const sendActivationEmail = async (to, url, txt) => {
  oauth2Client.setCredentials({
      refresh_token :  GOOGLE_APP_REFRESH_TOKEN
  })
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = await nodemailer.createTransport({

      service: "gmail",
      auth: {
          type : "OAuth2",
          user : SENDER_EMAIL_ADDRESS,
          clientId:  GOOGLE_APP_CLIENT_ID,
          clientSecret:  GOOGLE_APP_CLIENT_SECRET,
          refreshToken :  GOOGLE_APP_REFRESH_TOKEN,
          accessToken
      }
  })

  const mailOptions = {
  from: SENDER_EMAIL_ADDRESS,
  to : to,
  subject: "Smart Interview",
  html: `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Interview-Me!</h2>
    <p>Congratulations! You're almost set to start using our Interviewing Portal.
      Just click the button below to validate your email address.
    </p>
    
    <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>

    <p>If the button doesn't work for any reason, you can also click on the link below:</p>

    <div>${url}</div>
    </div>
  `
  }

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    if(err) return err;
    return infor
  })
}

const meetingAlertEmail = async (to, user, meeting) => {
  oauth2Client.setCredentials({
      refresh_token :  GOOGLE_APP_REFRESH_TOKEN
  })
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = await nodemailer.createTransport({

      service: "gmail",
      auth: {
          type : "OAuth2",
          user : SENDER_EMAIL_ADDRESS,
          clientId:  GOOGLE_APP_CLIENT_ID,
          clientSecret:  GOOGLE_APP_CLIENT_SECRET,
          refreshToken :  GOOGLE_APP_REFRESH_TOKEN,
          accessToken
      }
  })

  const mailOptions = {
  from: SENDER_EMAIL_ADDRESS,
  to : to,
  subject: "Meeting Laert",
  html: `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Smart Interview!</h2>
    
    <p>Hey! this mail is to inform you that You have a meeting scheduled with ${user.username}, which will be available after ${meeting.startDate} 
    and it will expire at ${meeting.expiryDate}. please make surev to be available at this time periode</p>

    
    </div>
  `
  }

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    if(err) return err;
    return infor
  })
}



module.exports = {
  sendActivationEmail,
  meetingAlertEmail
}
