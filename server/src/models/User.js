module.exports = (sequelize, DataTypes) => {
    sequelize.define('User', {
      login: {
          type: DataTypes.STRING,
          unique: true
      },
      token: DataTypes.STRING,
      creation: DataTypes.DATE
    })
}