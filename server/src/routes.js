const passport = require('passport')

const AuthenticationController = require('./controllers/AuthenticationController')
const RepoController = require('./controllers/RepoController')

module.exports = (app) => {
  /*
  app.use(allowCrossDomain)

  function allowCrossDomain (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    // intercepts OPTIONS method
    if (req.method === 'OPTIONS') {
      // respond with 200
      res.send(200)
    } else {
      // move on
      next()
    }
  }
  */

  function isAuthenticated (req, res, next) {
    passport.authenticate('jwt', function (err, user) {
      if (err || !user) {
        res.status(403).send({
          error: 'you do not have access to this resource'
        })
      } else {
        req.user = user
        next()
      }
    }) (req, res, next)
  }

  app.get('/status', (req, res) => {
    res.send({
      message: 'hello world!'
    })
  })

  app.post('/auth/github', AuthenticationController.register)

  app.get('/repos', isAuthenticated, RepoController.getUserRepos)
}
