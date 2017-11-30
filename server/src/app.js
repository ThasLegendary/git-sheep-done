const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

process.on('unhandledRejection', function (reason, p) {
  console.log('Unhandled Rejection:', reason.stack)
  process.exit(1)
})

require('./passport.js')

require('./routes.js')(app)

sequelize.sync().then(
  () => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
