import express from "express";
import * as bodyParser from "body-parser";
import { getLinksRouter } from "./backend/controllers/link_controller";
import { getAuthRouter } from "./backend/controllers/auth_controller";
import { getUserRouter } from "./backend/controllers/user_controller";

export async function getApp() {

    // Create express app
    const app = express();

    // Configure body parser middleware so we can send JSON
    // data in the HTTP requests
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Configure controllers
    app.use("/api/v1/links", getLinksRouter());
    app.use("/api/v1/auth", getAuthRouter());
    app.use("/api/v1/users", getUserRouter());

    return app;
}