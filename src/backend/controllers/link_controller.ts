import { Router, Request, Response } from "express";
import { getRepository } from '../repositories/link_repository';
import { getVoteRepository } from '../repositories/vote_repository';
import { Link } from "../entities/link";
import { Vote } from "../entities/vote";
import { Repository } from "typeorm";
import { authMiddleware } from "../middleware/auth_middleware";

// Handle HTTP requests
export function getHandlers(_linkRepository: Repository<Link>, _voteRepository: Repository<Vote>) {
    
    // GET all links
    const getAllLinksHandler = (req: Request, res: Response) => {
        (async () => {
            const links = await _linkRepository.find();
            res.json(links).send();
        })();
    };
    
    // GET link bt ID
    const getLinkByIdHandler = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const link = _linkRepository.findOne({
            where: {
                id: id
            }
        });
        res.json(link).send();
        if (link === undefined) {
            res.status(404).send();
        }
        res.json(link).send();
    };

    // POST create a new link
    const createLink = (req: Request, res: Response) => {
        (async () => {
            const user = (req as any).user;
            const title = req.body.title;
            const url = req.body.url;
            if (!title || !url || !user) {
                res.status(400)
                res.send(`Bad Request - Missing paramenter.`);
            } else {
                const newLink = await _linkRepository.save({ title: title, url: url, user: { id: user } });
                return res.json(newLink);
            }            
        })();
    };

    // DELETE a link by ID
    const deleteLink =  (req: Request, res: Response) => {
        (async () => {
            const linkId = req.params.id;
            const userId = (req as any).userId;

            const link = await _linkRepository.findOne({
                where: {
                    id: linkId,
                    user: userId
                }
            });

            if (link === undefined){
                res.status(404).send(`Link not found.`);
            } else {
                // Delete the link
                const link = _linkRepository.deleteById(linkId);
                // Return an empty json
                res.json({});
            }
        })();
    };

    // Upvote a link
    const upvoteLink = (req: Request, res: Response) => {
        (async () => {
            const linkId = req.params.id;
            const userId = (req as any).userId;
            // This time using the vote repository
            const foundVote = await _voteRepository.findOne({
                where: {
                    user: userId,
                    link: linkId,
                }
            });
            // Add if not found!
            if (foundVote === undefined){
                const newVote = await _voteRepository.save({ user: {id: userId}, isUpvote: true , link: {id: linkId} });
                res.json(newVote);
            }
            // If found, verify if it is upvoted or not
            else{
                // if it is upvoted, complain
                if ((foundVote as any).isUpvote){
                    res.status(400).send();
                }
                // otherwise, update!
                else {
                    (foundVote as any).isUpvote = true; 
                    res.json(await _voteRepository.save(foundVote));
                }
            }
        })(); 
    }

    // Downvote a link
    const downvoteLink = (req: Request, res: Response) => {
        (async () => {
            const linkId = req.params.id;
            const userId = (req as any).userId;
            // This time using the vote repository to look for the entry
            const foundVote = await _voteRepository.findOne({
                where: {
                    user: userId,
                    link: linkId,
                }
            });
            // If not found, add it!
            if (foundVote === undefined){
                const newVote = await _voteRepository.save({ user: {id: userId}, isUpvote: false , link: {id: linkId} });
                res.json(newVote);
            }
            // If found, verify if it is upvoted or not
            else{
                // if it is downvoted, complain
                if ((foundVote as any).isUpvote){
                    (foundVote as any).isUpvote = false; 
                    res.json(await _voteRepository.save(foundVote));
                }
                // otherwise, update!
                else {
                    res.status(400).send();
                }
            }
        })(); 
    }

    return {
        getAllLinksHandler,
        getLinkByIdHandler,
        createLink,
        deleteLink,
        upvoteLink,
        downvoteLink
    };
}

export function getLinksRouter() {
    const handlers = getHandlers(getRepository(), getVoteRepository() );
    const linkRouter = Router();
    // Returns all links
    linkRouter.get("/", handlers.getAllLinksHandler); // public
    // Creates a new link
    linkRouter.post("/", handlers.createLink); // private
    // Deletes a link by ID
    linkRouter.delete("/:id", authMiddleware, handlers.deleteLink); // private
    // Upvotes link
    linkRouter.post("/:id/upvote", authMiddleware, handlers.upvoteLink); // private
    // Downvotes link
    linkRouter.post("/:id/downvote", authMiddleware, handlers.downvoteLink); // private
    // Returns a link by ID
    linkRouter.get("/:id/", handlers.getLinkByIdHandler); // public
    
    return linkRouter;
}