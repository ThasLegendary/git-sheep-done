var Axios = require('axios')

function Request (options) {
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

  console.log(payloadString)

  let req = Axios.create({
    baseURL: `https://api.github.com`,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': payloadString.length,
      'Authorization': 'Bearer ' + token,
      'User-Agent': 'Git Sheep Done backend'
    }
  })

  return req.post('/graphql', payloadString)
}

module.exports = Request
