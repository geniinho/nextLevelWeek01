// importar a dependencia do sqlite3

const sqlite3 = require("sqlite3").verbose()

//criar obj de banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db


db.run(`DELETE FROM places WHERE id = ?`, [5])