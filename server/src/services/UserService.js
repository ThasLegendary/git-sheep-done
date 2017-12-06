const Request = require('./GitHubService')

class User {
  constructor (login, name, avatar) {
    this.login = login
    this.name = name
    this.avatar = avatar
  }
}

class UserService {
  static getViewerDetails (token, callback) {
    const params = {
      token: token,
      query: '{ viewer { login, avatarUrl} }'
    }

    var apiCallback = function (error, json) {
      callback(new User(json.data.viewer.login, json.data.viewer.name, json.data.viewer.avatarUrl))
    }

    Request(params, apiCallback)
  }

  static getRepoUsers (token, owner, repoName, callback) {
    const query = `repository(owner: $owner, name: $repo) {
        assignableUsers(first:100) {
          edges {
            node {
              name,
              login,
              avatarUrl
            }
          }
        }
      }`

    const params = {
      token: token,
      query: query,
      variables: {
        owner: owner,
        repo: repoName
      }
    }

    var apiCallback = function (error, json) {
      var repos = []
      json.data.viewer.repositories.edges.forEach(function (edge) {
        var repo = new Repo(edge.node.name, edge.node.description, edge.node.owner.login);          
        repos.push(repo)
      })

      callback(repos)
    }

    Request(params, apiCallback)
  }
}

module.exports = UserService
