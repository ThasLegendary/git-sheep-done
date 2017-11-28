const AuthenticationController = require('./controllers/AuthenticationController')


module.exports = (app) => {

    app.get('/status', (req, res) => {
        res.send({
        message: 'hello world!'
        })
    })
    
    app.post('/auth/github', AuthenticationController.register)
}