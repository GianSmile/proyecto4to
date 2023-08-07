import { Request, Response } from "express";

import express from "express";

import { PrismaClient, User, Analysis, Pet, Prisma} from '@prisma/client'; 

const prisma: PrismaClient = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.get("/user/:userName", async (req: Request, res: Response) => {
    const { userName } = req.params;
    const user = await prisma.user.findUnique({
        where: { username: userName },
        select: {
            ID: true,
            username: true,
            password: false,
            email: true,
            phone: true
        }
    }).catch((err: Prisma.PrismaClientKnownRequestError) => {
        res.status(400).send(err.message)
    });

    if (!user)
    {
        res.status(404).send("User not found");
        return;
    }

    res.status(200).json(user);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});