import { Request, Response } from 'express';

import { PrismaClient, User, Analysis, Pet, Prisma} from '@prisma/client'; 

const prisma: PrismaClient = new PrismaClient();

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