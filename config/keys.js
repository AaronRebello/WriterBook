
const username = require('./appConfig').username
const password = require('./appConfig').password
const dbName = require('./appConfig').dbName




module.exports = {
    googleClientID:'801716319260-ohb9jkpjsafnsu009fggi3eehb94h3h7.apps.googleusercontent.com',
    googleClientSecret:'9Pcdkt7sDdCVW2KCOrS3OQVD',
    mongoURI: `mongodb+srv://${username}:${password}@cluster0-y6kpo.mongodb.net/${dbName}?retryWrites=true&w=majority`
}