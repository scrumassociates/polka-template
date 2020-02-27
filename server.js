const app = require('polka')();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./app/models");
const routes = require('./app/routes');
const middleware = require('./app/middleware');
const dbConfig = require('./app/config/db.config.js');

var corsOptions = {
    origin: "http:/localhost:8081"
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

middleware(app);

if (dbConfig.forceSync) {
    db.sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
    });
} else {
    db.sequelize.sync();
}

app.get("/", (req, res) => {
    res.end(JSON.stringify({ message: "Welcome to bezkoder application " }))
});

routes(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Running on localhost:3000`);
});
