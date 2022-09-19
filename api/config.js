// importing required data dependencies
const { DB_USERNAME, DB_PASSWORD } = require('./credentials');


// seeting allowed APP_MODES
const ALLOWED_APP_MODES = ['DEV', 'PROD']

const APP_MODE = process.env.APP_MODE && ALLOWED_APP_MODES.includes(process.env.APP_MODE) ? process.env.APP_MODE : 'PROD';


console.log(`APP_MODE`, APP_MODE)


// exporting condfg paramters as module
module.exports = {

  NODE_PORT: 4000,

  APP_MODE,

  BASE_API_URL : APP_MODE === 'DEV' ? 'http://localhost:4000' : 'http://localhost:4000',

  CLIENT_BASE_URL: APP_MODE === `DEV` ? `http://localhost:3000` : `http://localhost:3000`, 

  MONGODB_ATLAS_CONNECTION_URI : `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@smart-interview.k0rap.mongodb.net/smart-interview`,

  // MONGODB_ATLAS_CONNECTION_URI: 'mongodb://127.0.0.1:27017/smart-interview',

  HTTP_STATUS_CODES: {

    SUCCESS: 200,

    CREATED: 201,

    BAD_REQUEST: 400,

    UNAUTHORIZED: 401,

    FORBIDDEN: 403,

    NOT_FOUND: 404,

    CONFLICT: 409,

    SERVER_ERROR: 500

  },

  ALLOWED_VALIDATION_SCHEMA_SCOPES: {

    BODY: `BODY`,

    PARAMS: `PARAMS`,

    QUERY: `QUERY`,

    NONE: `NONE`

  },

  ALLOWED_USER_ROLES: [ `CANDIDATE`, `INTERVIEWER`, `ADMIN` ],

  JWT_EXPIRES_IN_SECONDS: 1296000 // 15 DAYS



}