var RepoService = require('../services/RepoService')
var {Repo} = require('../models')

module.exports = {
  // list all repos accessible by the user
  async getUserRepos (req, res) {
    Promise.all([
      RepoService.getUserRepos(req.user.token),
      req.user.getRepos()
    ])
      .then(function (values) {
        var repos = values[0]
        var userRepos = values[1]

        console.debug(repos)
        console.debug(userRepos)

        for (var i = 0; i < repos.length; i++) {
          repos[i].enabled = false
          for (var j = 0; j < userRepos.length; j++) {
            if (repos[i].id === userRepos[j].id) {
              repos[i].enabled = true
            }
          }
        }

        res.send(repos)
      })
      .catch(function (err) {
        console.error(err)
        res.status(500).json({error: 'Failed to retrieve user list'})
      })
  },

  async enableUserRepo (req, res) {
    var promises = []
    if (req.params.enable) {
      var repoCreation = Repo.upsert({
        id: req.params.repoId
      })
      promises.push(repoCreation)

      var linkCreation = req.user.addRepo(req.params.repoId)
      promises.push(linkCreation)
    } else {
      var linkDeletion = req.user.removeRepo(req.params.repoId)
      promises.push(linkDeletion)
    }

    Promise.all(promises)
      .then(function (values) {
        res.send({status: 'ok'})
      })
      .catch(function (err) {
        console.error(err)
        res.status(500).json({error: 'Failed to set repo state'})
      })
  }
}
