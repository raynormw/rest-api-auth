require('dotenv').config();
let sec = process.env.SECRET_KEY;
var jwt = require('jsonwebtoken');

function admin(req, res, next) {
  let token = req.headers.token

  if(token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if(decoded.role == 'admin') {
        next()
      } else {
        res.send('This route for admin only')
      }
    })
  } else {
    res.send('Please login first!')
  }
}

function auth(req, res, next) {
  let token = req.headers.token

  if(token) {
    jwt.verify(token, sec, (err, decoded) => {
      if(decoded.role == 'admin' || decoded.id == req.params.id) {
        next()
      } else {
        res.send('This route for admin and authenticated user only')
      }
    })
  } else {
    res.send('Please login first!')
  }
}

module.exports = {
  admin, auth
};
