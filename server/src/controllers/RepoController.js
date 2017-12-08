var RepoService = require('../services/RepoService')
var UserRepo = require('../models/UserRepo')

module.exports = {
  // list all repos accessible by the user
  async getUserRepos (req, res) {
    Promise.all([
      RepoService.getUserRepos(req.user.token),
      UserRepo.findAll({ where: { userId: req.user.id } })
    ])
      .then(function (values) {
        res.send(repos)
      })
      .catch(function (err) {
        console.error(err)
        res.status(500).json({error: 'Failed to retrieve user list'})
      })
  }
}
