const Request = require('./GitHubService')

class User {
  constructor (id, login, name, avatar) {
    this.id = id
    this.login = login
    this.name = name
    this.avatar = avatar
  }
}

class UserService {
  static getViewerDetails (token, callback) {
    return new Promise(function (resolve, reject) {
      const params = {
        token: token,
        query: '{viewer { databaseId, login, name, avatarUrl}}'
      }

      Request(params)
        .then(function (response) {
          var json = response.data.data
          console.debug(json)

          if (json.errors) {
            reject(json.errors)
          } else {
            resolve(new User(json.viewer.databaseId, json.viewer.login, json.viewer.name, json.viewer.avatarUrl))
          }
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  static getRepoUsers (token, owner, repoName) {
    return new Promise(function (resolve, reject) {
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

      Request(params)
        .then(function (response) {
          var json = response.data.data
          console.debug(json)

          if (json.errors) {
            reject(json.errors)
          } else {
            var users = []
            json.viewer.repositories.edges.forEach(function (edge) {
              var user = new User(edge.node.login, edge.node.name, edge.node.owner.avatar, null);
              users.push(user)
            })
            resolve(users)
          }
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
}

module.exports = UserService
