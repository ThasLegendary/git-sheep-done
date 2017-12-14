module.exports = (sequelize, DataTypes) => {
  const Repo = sequelize.define('Repo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  })

  return Repo
}
