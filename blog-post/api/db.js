import mysql from "mysql2";

export const db = mysql.createConnection({
    host:"blogpost.cmqqpanhshqb.us-east-2.rds.amazonaws.com",
    user:"bajgaitulashiram",
    password:"SaruTulsi1",
    database:"blogpost"
})