const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.HOST || "localhost",
    port: 8889,
    user: process.env.USER || "root",
    password: process.env.PASSWORD || "root",
    database: process.env.DB || "burgers_db"
});

connection.connect((err) => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;