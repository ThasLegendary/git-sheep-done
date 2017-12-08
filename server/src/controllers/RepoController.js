var RepoService = require('../services/RepoService')

module.exports = {
  // list all repos accessible by the user
  async getUserRepos (req, res) {
    RepoService.getUserRepos(req.user.token)
      .then(function (repos) {
        res.send(repos)
      })
      .catch(function (err) {
        res.status(500).json(err)
      })
  }
}
