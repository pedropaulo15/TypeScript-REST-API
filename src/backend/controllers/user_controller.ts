import { Router } from "express";
import { getRepository } from '../repositories/user_repository';

const userRouter = Router();

userRouter.get("/", function (req, res) {
    const userRepository = getRepository();
    userRepository.find().then((user) => {
        res.json(user);
    }).catch((e: Error) => {
        res.status(500);
        res.send(e.message);
    });
});

userRouter.post("/", function (req, res) {
    const userRepository = getRepository();
    const newUser = req.body;
    if(!(typeof newUser.email === "string" || typeof newUser.password === "string")){
        res.status(400);
        res.send(`Invalid User or Password!`);
    }
    userRepository.find(newUser).then((user) => {
        res.json(user);
    }).catch((e: Error) => {
        res.status(500);
        res.send(e.message);
    });
});

//TO DO > Create a new user and return it when it is done. Error 400 if email is already used by another user.
// 
// userRouter.post("/", function (req, res) {
//     const userRepository = getRepository();
//     const newUser = req.body;
//     if(!(typeof newUser.email === "string" || typeof newUser.password === "string")){
//         res.status(400);
//         res.send(`Invalid User or Password!`);
//     }
//     userRepository.find(newUser).then((user) => {
//         res.json(user);
//     }).catch((e: Error) => {
//         res.status(500);
//         res.send(e.message);
//     });
// });

export { userRouter };