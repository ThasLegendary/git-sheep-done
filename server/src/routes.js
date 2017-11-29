const AuthenticationController = require('./controllers/AuthenticationController')


module.exports = (app) => {

    app.use(allowCrossDomain);

    function allowCrossDomain(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
        res.header('Access-Control-Allow-Headers', 'Content-Type')

        // intercepts OPTIONS method
        if ('OPTIONS' === req.method) {
            // respond with 200
            res.send(200)
        } else {
            // move on
            next()
        }
    }

    app.get('/status', (req, res) => {
        res.send({
            message: 'hello world!'
        })
    })

    app.post('/auth/github', AuthenticationController.register)
}