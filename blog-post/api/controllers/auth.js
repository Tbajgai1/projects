import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
    // Check if user exists
    const q1 = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q1, [req.body.email, req.body.username], (err, data) => {
        if (err) {
            // console.error("Error checking for existing users:", err);
            return res.status(500).json("Internal Server Error");
        }

        if (data.length) {
            return res.status(409).json("User Already Exists");
        }

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        let q2;
        let values;

        if (req.body.img) {
            q2 = "INSERT INTO users(username, email, password, img) VALUES (?, ?, ?, ?)";
            values = [req.body.username, req.body.email, hash, req.body.img];
        } else {
            q2 = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";
            values = [req.body.username, req.body.email, hash];
        }

        db.query(q2, values, (err, data) => {
            if (err) {
                // console.error("Error during user insertion:", err);
                return res.status(500).json("Internal Server Error");
            }

            // console.log("User has been created:", data);
            return res.status(200).json("User has been created.");
        });
    });
};

export const login = (req, res) => {
    // Check if user exists
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) {
            // console.error("Error checking for user:", err);
            return res.status(500).json("Internal Server Error");
        }

        if (data.length === 0) {
            return res.status(404).json("User not found!");
        }

        // Check password
        const isPasswordMatch = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordMatch) {
            return res.status(400).json("Incorrect password");
        }

        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        const { password, ...other } = data[0];
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(other);
    });
};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    }).status(200).json("User has been logged out!");
};
