import { Request, Response } from 'express';

import { PrismaClient, User, Analysis, Pet, Prisma} from '@prisma/client'; 

const prisma: PrismaClient = new PrismaClient();

const userRegex = /^(?!.*\.\.)(?!.*__)(?!.*\.$)[a-z_.]{0,30}$/;
const emailRegex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

export async function getUser(req: Request, res: Response)
{
    const { userName } = req.params;
    const user = await prisma.user.findUnique({
        where: { username: userName },
        select: {
            ID: true,
            username: true,
            password: false,
            email: true,
            phone: true,
            is_vet: true,
            vet_dni: true,
            vet_reg_id: true,
            vet_degree: true
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
}

export async function getUserPets(req: Request, res: Response)
{
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
}

export async function getPet(req: Request, res: Response)
{
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
}

export async function getPetAnalyses(req: Request, res: Response)
{
    const { petId } = req.params;

    const pet = await prisma.pet.findUnique({
        where: { ID: parseInt(petId) },
        include: { analyses: true }
    }).catch((err: Prisma.PrismaClientKnownRequestError) => {
        res.status(400).send(err.message)
    });

    if (!pet)
    {
        res.status(404).send("Pet not found");
        return;
    }

    res.status(200).json(pet.analyses);
}

export async function getUserAnalyses(req: Request, res: Response)
{
    const { userName } = req.params;

    const user = await prisma.user.findUnique({
        where: { username: userName },
        include: { 
            pets: {
                include: { analyses: true }
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

    const analyses: Analysis[] = [];

    user.pets.forEach((pet) => {
        analyses.push(...pet.analyses);
    });

    res.status(200).json(analyses);
}

export async function getAnalysis(req: Request, res: Response) {
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
}

export async function postRegister(req: Request, res: Response)
{
    const { username, password, email, phone, fullname, is_vet, vet_dni, vet_reg_id, vet_degree } = req.body;

    if (username && !userRegex.test(username))
    {
        res.status(400).send("Username can only contain lowercase letters, numbers, underscores and dots. It must not have 2 continuous dots or underscores, or end with a dot.");
        return;
    }

    if (email && !emailRegex.test(email))
    {
        res.status(400).send("Invalid email");
        return;
    }

    if (is_vet && (!vet_dni || !vet_reg_id || !vet_degree))
    {
        res.status(400).send("Missing vet data");
        return;
    }

    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
            email: email,
            phone: phone,
            fullname: fullname,
            is_vet: is_vet,
            vet_dni: vet_dni,
            vet_reg_id: vet_reg_id,
            vet_degree: vet_degree,
        }
    }).catch((err: Prisma.PrismaClientKnownRequestError) => {
        res.status(400).send(err.message)
    });

    if (!user)
    {
        res.sendStatus(500);
        return;
    }

    createAndSetToken(user, res);
    res.sendStatus(200);
}

export async function postLogin(req: Request, res: Response)
{
    const { identifier, password } = req.body;
    let condition;

    if (!identifier || !password || password !instanceof String)
    {
        res.status(400).send("Missing identifier or password");
        return;
    }


    if (emailRegex.test(identifier))
        condition = { email: identifier, password: password };
    else if (userRegex.test(identifier))
        condition = { username: identifier, password: password };
    else
    {
        res.status(400).send("Invalid identifier");
        return;
    }

    const user = await prisma.user.findUnique({
        where: condition
    }).catch((err: Prisma.PrismaClientKnownRequestError) => {
        res.status(400).send(err.message)
    });

    if (!user)
    {
        res.status(401).send("Wrong identifier or password");
        return;
    }

    createAndSetToken(user, res);
    res.sendStatus(200);
}

function createAndSetToken(user: User, res: Response)
{
    const token: String = "TODO";
    res.header("Set-Cookie", "token=" + token);
}