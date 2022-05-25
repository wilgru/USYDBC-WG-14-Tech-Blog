const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// init new sequelize DB from jawsdb if it exists, otherwise use local db
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3001
        }
    );
}

module.exports = sequelize;