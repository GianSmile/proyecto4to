import { Request, Response } from "express";

export function authMiddleware(req: Request, res: Response, next: any)
{
    if (req.path === "/login")
    {
        next();
        return;
    }

    const { authorization } = req.headers;

    if (!authorization)
    {
        res.sendStatus(401);
        return;
    }

    const token = authorization.split(" ")[1];

    if (!token)
    {
        res.sendStatus(401);
        return;
    }



    next();
}