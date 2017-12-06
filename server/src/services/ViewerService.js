
const Request = require('./GitHubService')

class Viewer {
  constructor (name, avatar) {
    this.name = name
    this.avatar = avatar
  }
}

class ViewerService {
  static getViewerDetails (token, callback) {
    const params = {
      token: token,
      query: '{ viewer { login, avatarUrl} }'
    }

    var apiCallback = function (error, json) {
      callback(new Viewer(json.data.viewer.login, json.data.viewer.avatarUrl))
    }

    Request(params, apiCallback)
  }
}

module.exports = ViewerService
