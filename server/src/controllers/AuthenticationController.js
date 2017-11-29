// const { User } = require('../models')

var Axios = require('axios')
var config = require('../config/config.js')
var ViewerService = require('../services/ViewerService')

function parseQueryString(str) {
  let obj = {}
  let key
  let value;
  (str || '').split('&').forEach((keyValue) => {
    if (keyValue) {
      value = keyValue.split('=')
      key = decodeURIComponent(value[0])
      obj[key] = (value[1]) ? decodeURIComponent(value[1]) : true
    }
  })
  return obj
}

module.exports = {
  async register(req, res) {
    Axios.post('https://github.com/login/oauth/access_token', {
      client_id: config.auth.github.clientId,
      client_secret: config.auth.github.clientSecret,
      code: req.body.code,
      redirect_uri: req.body.redirectUri,
      state: req.body.state,
      grant_type: 'authorization_code'
    }, { 'Content-Type': 'application/json' }).then(function (response) {
      var responseJson = parseQueryString(response.data)
      console.log(responseJson)
      if (responseJson.error) {
        res.status(500).json({ error: responseJson.error })
      } else {
        // user is authenticated, retrieve its details
        ViewerService.getViewerDetails(responseJson.access_token, function (viewer) {
          console.log(viewer)
        });

        // create the user in the database if not existing
        /*
      try {
        const user = await User.create()
        res.send(user.toJSON())
      } catch (err) {
        res.status(400).send({
          error: 'User creation failed'
        })
      }
      */

        res.json(responseJson)
      }
    }).catch(function (err) {
      console.error(err);
      res.status(500).json(err)
    })
  }
}
