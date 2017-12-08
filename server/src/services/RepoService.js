const Request = require('./GitHubService')

class Repo {
  constructor (name, description, owner) {
    this.name = name
    this.description = description
    this.owner = owner
  }
}

class RepoService {
  static async getUserRepos (token, callback) {
    const query = `{
      viewer {
        repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], orderBy: { field: NAME, direction: ASC }) {
          edges {
            node {
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

    var apiCallback = function (error, json) {
      if (error) {
        console.err(error)
      }
      console.log(json)
      var repos = []
      json.viewer.repositories.edges.forEach(function (edge) {
        var repo = new Repo(edge.node.name, edge.node.description, edge.node.owner.login);          
        repos.push(repo)
      })

      callback(repos)
    }

    Request(params, apiCallback)
  }
};

module.exports = RepoService
