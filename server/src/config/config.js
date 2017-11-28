module.exports = {
    port: 8081,
    db: {
        database: process.env.DB_NAME || 'gitsheepdone',
        user: process.env.DB_USER || 'gitsheepdone',
        password: process.env.DB_PASSWORD || 'gitsheepdone',
        options: {
            dialect: process.env.DB_DIALECT || 'sqlite',
            host: process.env.DB_HOST || 'localhost',
            storate: './gitsheepdone.sqlite'
        }
    }
}