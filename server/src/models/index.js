const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config.js')

const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    console.log('Importing model ' + path.join(__dirname, file))
    db[file.slice(0, -3)] = sequelize.import(path.join(__dirname, file))
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
