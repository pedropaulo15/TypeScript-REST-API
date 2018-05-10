import { Router, Request, Response } from "express";
import { getRepository } from '../repositories/user_repository';
import { User } from "../entities/user";
import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken";

const userRouter = Router();
// Retruns all users
userRouter.get("/", function (req, res) {
    const userRepository = getRepository();
    userRepository.find().then((user) => {
        res.json(user);
    }).catch((e: Error) => {
        res.status(500);
        res.send(e.message);
    });
});

// Creates a new user account
userRouter.post("/", function (req, res) {
    const userRepository = getRepository();
    const newUser = req.body;
    if(!(typeof newUser.email === "string" || typeof newUser.password === "string")){
        res.status(400);
        res.send(`Invalid Username or Password!`);
    } 

    // Check if the email is already taken
    const userCheck = userRepository.findOne({
        where: {
            email: newUser.email,
            password: newUser.password
        }
    });
    // Return error 400 in case email has already been taken
    if (userCheck) {
        res.status(400);
        res.send(`Email already taken, please try another one.`);
    }
    // Return the new user object.
    userRepository.find(newUser).then((user) => {
        res.json(user);
    }).catch((e: Error) => {
        res.status(500);
        res.send(e.message);
    });
});

export { userRouter };

// Handle HTTP requests
// export function getHandlers(_userRepository: Repository<User>) {
    
//     const getAllUsersHandler = (req: Request, res: Response) => {
//         (async () => {
//             const users = await _userRepository.find();
//             res.json(users).send();
//         })();
//     };
    
//     const getUserByIdHandler = (req: Request, res: Response) => {
//         const id = parseInt(req.params.id);
//         const user = _userRepository.findOne({
//             where: {
//                 id: id
//             }
//         });
//         if (user === undefined) {
//             res.status(404).send();
//         }
//         res.json(user).send();
//     };

//     const createUser = (req: Request, res: Response) => {
//         (async () => {
//             const email = req.body.email;
//             const password = req.body.password;
//             if (!email || password) {
//                 res.status(400).send();
//             } else {
//                 const newuser = await _userRepository.save({ email: email, password: password});
//                 return res.json(newuser);
//             }            
//         })();
//     };

//     const deleteUser =  (req: Request, res: Response) => {
//         // TODO
//         res.json({});
//     };

//     const getTokenHandler = (req: Request, res: Response) => {
//         (async () => {
//             const body = req.body;
//             const email = body.email;
//             const password = body.password;
//             if (!email || !password) {
//                 res.status(400).send();
//             } else {
//                 const user = await _userRepository.findOne({
//                     where: {
//                         email: email,
//                         password: password
//                     }
//                 });
//                 if (!user) {
//                     res.status(401).send();
//                 } else {
//                     const payload = { id: user.id };
//                     const secret = process.env.AUTH_SECRET;
//                     if (typeof secret === "string") {
//                         const token = jwt.sign(payload, secret);
//                         res.json({ token: token });
//                     } else {
//                         res.status(500).send();
//                     }
//                 }
//             }
//         })();
//     };

//     return {
//         getAllUsersHandler,
//         getUserByIdHandler,
//         createUser,
//         deleteUser,
//         getTokenHandler
//     };
// }

// export function getLinksRouter() {
//     const handlers = getHandlers(getRepository());
//     const userRouter = Router();
//     userRouter.post("/api/v1/users", handlers.getTokenHandler);
//     return userRouter;
// }