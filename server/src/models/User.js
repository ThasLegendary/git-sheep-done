module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    avatar: DataTypes.STRING,
    token: DataTypes.STRING
  })

  return User
}
