const secret = require('../config/jwt.config.js').secret;
const jose = require('jose');

module.exports = (req, res, next) => {
    var authorization = req.headers['authorization'];
    if (!authorization) { authorization = ""; }
    var parts = authorization.split(" ");
    if (parts.length == 2) {
        var token = parts[1];
        var userInfo = jose.JWT.verify(
            token,
            secret,
            { algorithms: ["HS256"] }
        )
        if (userInfo) {
            req.userInfo = userInfo;
        }
    }
    next();
};
