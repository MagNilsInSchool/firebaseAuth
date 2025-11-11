import dotenv from "dotenv";
dotenv.config();

import "./firebaseAdmin.ts";
import express from "express";
import cors from "cors";
import { verifyToken } from "./middleware/auth.ts";
import { beanPuns } from "./data.ts";

const app = express();
const PORT = 1338;
const corsOptions = {
    origin: ["http://localhost:1337"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/secure-data", verifyToken, (req, res) => {
    const randomBeanPun = beanPuns[Math.floor(Math.random() * beanPuns.length)];
    return res.status(200).json(randomBeanPun);
});

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});
