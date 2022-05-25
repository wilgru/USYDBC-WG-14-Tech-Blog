const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.port || 3001;

// handle bars
const hbs = exphbs.create({ helpers });


// session config and implementation
const sess = {
    secet: "",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
}

app.use(session(sess));

// Inform Express.js which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

// other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'publuc')));

// use controllers
app.use(routes);

// port listener + sequelize sync
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});