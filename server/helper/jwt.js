const jwt = require('jsonwebtoken');
var secret = process.env.secret

module.exports = {
    sign(user) {
        return jwt.sign(user, secret)
    },

    verify(token) {
        return jwt.verify(token, secret)
    }
}
