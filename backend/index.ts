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

app.get("/user/:userName/pets", async (req: Request, res: Response) => {
    const { userName } = req.params;
    const user = await prisma.user.findUnique({
        where: { username: userName },
        include: { pets: true }
    }).catch((err: Prisma.PrismaClientKnownRequestError) => {
        res.status(400).send(err.message)
    });

    if (!user)
    {
        res.status(404).send("User not found");
        return;
    }

    res.status(200).json(user.pets);
});

app.get("/pet/:petId", async (req: Request, res: Response) => {
    const { petId } = req.params;

    const pet = await prisma.pet.findUnique({
        where: { ID: parseInt(petId) },
    }).catch((err: Prisma.PrismaClientKnownRequestError) => {
        res.status(400).send(err.message)
    });

    if (!pet)
    {
        res.status(404).send("Pet not found");
        return;
    }

    res.status(200).json(pet);
});

app.get("/pet/:petId/analysis", async (req: Request, res: Response) => {
    const { petId } = req.params;

    const pet = await prisma.pet.findUnique({
        where: { ID: parseInt(petId) },
        include: { analysis: true }
    }).catch((err: Prisma.PrismaClientKnownRequestError) => {
        res.status(400).send(err.message)
    });

    if (!pet)
    {
        res.status(404).send("Pet not found");
        return;
    }

    res.status(200).json(pet.analysis);
});

app.get("/user/:userName/analysis", async (req: Request, res: Response) => {
    const { userName } = req.params;

    const user = await prisma.user.findUnique({
        where: { username: userName },
        include: { 
            pets: {
                include: { analysis: true }
            } 
        }
    }).catch((err: Prisma.PrismaClientKnownRequestError) => {
        res.status(400).send(err.message)
    });

    if (!user)
    {
        res.status(404).send("User not found");
        return;
    }

    const analysis: Analysis[] = [];

    user.pets.forEach((pet) => {
        analysis.push(...pet.analysis);
    });

    res.status(200).json(analysis);
});

app.get("/analysis/:analysisId", async (req: Request, res: Response) => {
    const { analysisId } = req.params;

    const analysis = await prisma.analysis.findUnique({
        where: { ID: parseInt(analysisId) },
    }).catch((err: Prisma.PrismaClientKnownRequestError) => {
        res.status(400).send(err.message)
    });

    if (!analysis)
    {
        res.status(404).send("Analysis not found");
        return;
    }

    res.status(200).json(analysis);
});

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