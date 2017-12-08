module.exports = (sequelize, DataTypes) => {
  const UserRepo = sequelize.define('UserRepo', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    repoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  return UserRepo
}
