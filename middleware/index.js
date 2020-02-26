const one = require('./one');
const two = require('./two');

function middleware(app) {
    console.log('initializing middleware');
    app.use(one, two);
};

module.exports = middleware;