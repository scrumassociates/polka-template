const resSend = require('./res.send.js');
const jwtVerify = require('./jwt.verify.js');

module.exports = (app) => {
    console.log('initializing middleware');
    app.use(resSend, jwtVerify);
}