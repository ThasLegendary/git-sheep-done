module.exports = (sequelize, DataTypes) => {
  const RepoTeam = sequelize.define('RepoTeam', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    enabled: DataTypes.BOOLEAN
  })

  return RepoTeam
}
