var fetch = require('node-fetch')

class Viewer {
    constructor(name, avatar) {
        this.name = name;
        this.avatar = avatar;
    }
}

class ViewerService {

    static getViewerDetails(token, callback) {
        const query = 'query { viewer { login, avatarUrl} }'

        var request = {
            method: 'POST',
            body: JSON.stringify({ query }),
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

        fetch('https://api.github.com/graphql', request)
            .then(handleErrors)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (json) {
                callback(new Viewer(json.data.viewer.login, json.data.viewer.avatarUrl))
            })
            .catch(error => console.error(error));
    }
};

module.exports = ViewerService;