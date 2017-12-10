const Request = require('./GitHubService')

class Repo {
  constructor (id, name, description, owner) {
    this.id = id
    this.name = name
    this.description = description
    this.owner = owner
  }
}

class RepoService {
  static async getUserRepos (token, callback) {
    return new Promise(function (resolve, reject) {
      const query = `{
        viewer {
          repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], orderBy: { field: NAME, direction: ASC }) {
            edges {
              node {
                databaseId,
                name,
                description
                owner {
                  login
                }
              }
            }
          }
        }
      }`

      const params = {
        token: token,
        query: query
      }

      Request(params)
        .then(function (response) {
          var json = response.data.data
          console.debug(json)

          if (json.errors) {
            reject(json.errors)
          } else {
            var repos = []
            json.viewer.repositories.edges.forEach(function (edge) {
              var repo = new Repo(edge.node.databaseId, edge.node.name, edge.node.description, edge.node.owner.login)
              repos.push(repo)
            })
            resolve(repos)
          }
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
};

module.exports = RepoService
