import { Router, Request, Response } from "express";
import { getRepository } from "../repositories/user_repository";
import { Repository } from "typeorm";
import { User } from "../entities/user";
import * as jwt from "jsonwebtoken";

export function getHandlers(_userRepository: Repository<User>) {
    
    const getTokenHandler = (req: Request, res: Response) => {
        (async () => {
            const body = req.body;
            const email = body.email;
            const password = body.password;
            if (!email || !password) {
                res.status(400).send();
            } else {
                const user = await _userRepository.findOne({
                    where: {
                        email: email,
                        password: password
                    }
                });
                if (!user) {
                    res.status(401).send();
                } else {
                    const payload = { id: user.id };
                    const secret = process.env.AUTH_SECRET;
                    if (typeof secret === "string") {
                        const token = jwt.sign(payload, secret);
                        res.json({ token: token });
                    } else {
                        res.status(500).send();
                    }
                }
            }
        })();
    };
    return {
        getTokenHandler
    };
}

export function getAuthRouter() {
    const handlers = getHandlers(getRepository());
    const authRouter = Router();
    // Returns an auth token
    authRouter.post("/login/", handlers.getTokenHandler);
    return authRouter;
}
