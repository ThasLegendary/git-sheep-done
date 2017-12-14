module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    token: DataTypes.STRING
  })

  User.associate = models => {
    User.belongsToMany(models.Repo, {through: 'UserRepo'})
  }

  return User
}
