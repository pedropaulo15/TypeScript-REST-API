import { Router, Request, Response } from "express";
import { getRepository } from "../repositories/user_repository";
import { Repository } from "typeorm";
import { User } from "../entities/user";
import { authMiddleware } from "../middleware/auth_middleware";

export function getHandlers(_userRepository: Repository<User>) {
    
    // Create user
    const createUser = (req: Request, res: Response) => {
        (async () => {
            // getting values from request
            const email= req.body.email;
            const password = req.body.password;
            if (!password || !email) {
                res.status(400).send();
            } 
            else {
                // verifying that it doesn't exist already
                const user = await _userRepository.findOne({
                    where: {
                        email: email,
                    }
                    
                });
                // If it doesn't exist, create it!
                if(user === undefined){
                    const newUser = await _userRepository.save({ email: email, password: password});
                    return res.json(newUser);
                }
                // If it does, return 400 - Bad request
                else {
                    res.status(400).send();
                }
            }            
        })();
    };

    // Return all Users
    const getAllUsersHandler = (req: Request, res: Response) => {
        (async () => {
            const users = await _userRepository.find();
            res.json(users).send();
        })();
    };

    // Return user by User ID
    const getUserByIdHandler = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const user = _userRepository.findOne({
            where: {
                id: id
            }
        });
        res.json(user).send();
        if (user === undefined) {
            res.status(404).send();
        }
        res.json(user).send();
    };

    // Delete a User
    const deleteUser =  (req: Request, res: Response) => {
        (async () => {
            const userId = req.params.id;

            const user = await _userRepository.findOne({
                where: {
                    id: userId
                }
            });

            if (user === undefined){
                res.status(404).send(`User not found.`);
            } else {
                // Perform action if everything goes well
                const user = _userRepository.deleteById(userId);
                // Return an empty json
                res.json({});
            }
        })();
    };

    return {
        createUser,
        getAllUsersHandler,
        getUserByIdHandler,
        deleteUser
    };

}

export function getUserRouter() {
    const handlers = getHandlers(getRepository());
    const userRouter = Router();

    userRouter.post("/", authMiddleware, handlers.createUser); // public
    userRouter.get("/:id", handlers.getAllUsersHandler); // public
    userRouter.get("/", handlers.getAllUsersHandler); // public
    userRouter.delete("/:id", authMiddleware, handlers.deleteUser); // private

    return userRouter;
}
