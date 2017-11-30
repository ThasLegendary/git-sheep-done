var RepoService = require('../services/RepoService')

module.exports = {
  async getUserRepos (req, res) {
    RepoService.getUserRepos(req.user.token, function (repos) {
      res.send(repos)
    })
  }
}
