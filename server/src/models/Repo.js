module.exports = (sequelize, DataTypes) => {
  const Repo = sequelize.define('Repo', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    enabled: DataTypes.BOOLEAN
  })

  return Repo
}