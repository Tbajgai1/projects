import mysql from "mysql2";

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Tulsiram12345@",
    database:"blogpost"
})