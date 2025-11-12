import type { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Added expressUser.d.ts file to get this to work.
        next();
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: "Unauthorized" });
        }
        console.error("Error occured at verifyToken:", error);
    }
};
