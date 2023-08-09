import { Request, Response } from "express";

import express from "express";

import { PrismaClient, User, Analysis, Pet, Prisma} from '@prisma/client'; 

const prisma: PrismaClient = new PrismaClient();

const app = express();
app.use(express.json());

app.post("/user", async (req: Request, res: Response) => {
    const { username, password, email, phone, fullname } = req.body;

    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
            email: email,
            phone: phone,
            fullname: fullname,
            is_vet: false,
        },
    }).catch((err: Prisma.PrismaClientKnownRequestError) => {
        res.status(400).send(err.message)
    });

    if (!user)
    {
        res.status(500).send("Internal server error");
        return;
    }

    res.status(200).json(user); // o un token para auth?
});

app.post("/user/vet", async (req: Request, res: Response) => {
    const { username, password, email, phone, fullname, vet_dni, vet_reg_id, vet_degree } = req.body;

    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
            email: email,
            phone: phone,
            fullname: fullname,
            is_vet: true,
            vet_dni: vet_dni,
            vet_reg_id: vet_reg_id,
            vet_degree: vet_degree,
        }
    }).catch((err: Prisma.PrismaClientKnownRequestError) => {
        res.status(400).send(err.message)
    });

    if (!user)
    {
        res.status(500).send("Internal server error");
        return;
    }

    res.status(200).json(user); // o un token para auth?
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});