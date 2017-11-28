const axios = require('axios')
const query = `query {
    viewer {
    login,
        avatarUrl,
        contributedRepositories(first: 100) {
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

let options = {
    url: 'https://api.github.com/graphql',
    method: 'post',
    headers: {
        'Content-Type': 'application/graphql',
        'Authorization': 'Bearer ' + token
    },
    data: query
};

axios(options).then(res => {
    console.log(res.data)
}).catch(err => {
    console.log(err)
})