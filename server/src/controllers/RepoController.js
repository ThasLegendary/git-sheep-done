var RepoService = require('../services/RepoService')

module.exports = {
  // list all repos accessible by the user
  async getUserRepos (req, res) {
    RepoService.getUserRepos(req.user.token, function (repos) {
      res.send(repos)
    })
  }
}
