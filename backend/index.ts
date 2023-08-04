import { Request, Response } from "express";

import express from "express";

import { PrismaClient } from '@prisma/client'; 
const prisma = new  PrismaClient();

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});