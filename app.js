const middleware = require('./middleware');
const routes = require('./routes');
const app = require('polka')();

middleware(app);
routes(app);

app.listen(3000, err => {
    if (err) throw err;
    console.log(`> Running on localhost:3000`);
});
