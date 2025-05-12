import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Fc3m#1003",
    database: "db_transporte-opina"
})