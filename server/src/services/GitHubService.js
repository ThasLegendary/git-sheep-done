var Axios = require('axios')

function Request (options, cb) {
  var token = options.token
  var query = options.query
  var variables = options.variables || {}

  if (!token) {
    throw Error('Missing GitHub token')
  } else if (!query) {
    throw Error('Missing query')
  }

  var payload = {
    'query': query,
    'variables': variables
  }

  var payloadString = JSON.stringify(payload)

  let req = Axios.create({
    baseURL: `https://api.github.com`,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': payloadString.length,
      'Authorization': 'Bearer ' + token,
      'User-Agent': 'Git Sheep Done backend'
    }
  })

  req.post('/graphql', payloadString)
    .then(function (response) {
      console.log(response)
      cb(null, response)
    })
    .catch(function (error) {
      console.log(error)
      cb(error)
    })
}

module.exports = Request
