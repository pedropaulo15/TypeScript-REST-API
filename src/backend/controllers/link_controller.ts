import { Router, Request, Response } from "express";
import { getRepository } from '../repositories/link_repository';
import { Link } from "../entities/link";
import { Repository } from "typeorm";
import { authMiddleware } from "../middleware/auth_middleware";

// Handle Errors
const linkRouter = Router();

linkRouter.get("/api/v1/links", function (req, res) {
    const linkRepository = getRepository();
    linkRepository.find().then((link) => {
        res.json(link);
    }).catch((e: Error) => {
        res.status(500);
        res.send(e.message);
    });
});

linkRouter.post("/api/v1/links", function (req, res) {
    const linkRepository = getRepository();
    const newLink = req.body;
    if(!(typeof newLink.title === "string")){
        res.status(400);
        res.send(`Invalid Link!`);
    }
    linkRepository.find(newLink).then((link) => {
        res.json(link);
    }).catch((e: Error) => {
        res.status(500);
        res.send(e.message);
    });
});

export { linkRouter };

// Handle HTTP requests
export function getHandlers(_linkRepository: Repository<Link>) {
    
    const getAllLinksHandler = (req: Request, res: Response) => {
        (async () => {
            const links = await _linkRepository.find();
            res.json(links).send();
        })();
    };
    
    const getLinkByIdHandler = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const link = _linkRepository.findOne({
            where: {
                id: id
            }
        });
        if (link === undefined) {
            res.status(404).send();
        }
        res.json(link).send();
    };

    const createLink = (req: Request, res: Response) => {
        (async () => {
            const title = req.body.title;
            if (!title) {
                res.status(400).send();
            } else {
                const newLink = await _linkRepository.save({ title: title});
                return res.json(newLink);
            }            
        })();
    };

    const deleteLink =  (req: Request, res: Response) => {
        // TODO
        res.json({});
    };

    return {
        getAllLinksHandler,
        getLinkByIdHandler,
        createLink,
        deleteLink
    };
}

export function getLinksRouter() {
    const handlers = getHandlers(getRepository());
    const linkRouter = Router();
    // Returns all links
    linkRouter.get("/", handlers.getAllLinksHandler); // public
    // Creates a new link
    linkRouter.post("/", authMiddleware, handlers.createLink); // private
    // Deletes a link by ID
    linkRouter.delete("/:id", authMiddleware, handlers.deleteLink); // private
    // Upvotes link
    linkRouter.post("/:id/upvote", authMiddleware, handlers.createLink); // private
    // Downvotes link
    linkRouter.post("/:id/downvote", authMiddleware, handlers.createLink); // private
    // Returns a link by ID
    linkRouter.get("/:id", handlers.getLinkByIdHandler); // public
    
    return linkRouter;
}