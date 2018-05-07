import { Router } from "express";
import { getRepository } from '../repositories/vote_repository';

const voteRouter = Router();

voteRouter.get("/", function (req, res) {
    const voteRepository = getRepository();
    voteRepository.find().then((vote) => {
        res.json(vote);
    }).catch((e: Error) => {
        res.status(500);
        res.send(e.message);
    });
});

voteRouter.post("/", function (req, res) {
    const voteRepository = getRepository();
    const newVote = req.body;
    if(!(newVote.user || newVote.id)){
        res.status(400);
        res.send(`Invalid User or Password!`);
    }
    voteRepository.find(newVote).then((vote) => {
        res.json(vote);
    }).catch((e: Error) => {
        res.status(500);
        res.send(e.message);
    });
});

export { voteRouter };