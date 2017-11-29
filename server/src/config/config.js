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
  },
  auth: {
    github: {
      clientId: 'e7bd6ad5880748a3ef34',
      clientSecret: '27e09aa460e4734ac590e72a18f7ee90a9ad7cb0'
    }
  }
}
