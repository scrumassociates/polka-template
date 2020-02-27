const resSend = require('./res.send.js');

module.exports = (app) => {
    console.log('initializing middleware');
    app.use(resSend);
}