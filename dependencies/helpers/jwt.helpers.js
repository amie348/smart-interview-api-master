const jwt = require(`jsonwebtoken`);

// importing required secrete keys 
const { ACTIVATION_TOKEN_SECRET_KEY, ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require(`../credentials`);



// create activation token
const createActivationToken = (data) => {

  return jwt.sign(data, ACTIVATION_TOKEN_SECRET_KEY, {expiresIn: '10m'});

}

// create access token
const createAccessToken = (data) => {

  return jwt.sign(data, ACCESS_TOKEN_SECRET_KEY, { expiresIn: `10d` })

}

// create refresh token
const createRefreshToken = (data) => {

  return jwt.sign(data, REFRESH_TOKEN_SECRET_KEY, { expiresIn: `7d` })

}



// importing functions as modules
module.exports = {

  createAccessToken,
  createRefreshToken,
  createActivationToken

}