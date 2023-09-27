import express from "express";
import ShortURLController from "../controllers/shortURL.controller";

const routers = express.Router();

routers.post("/encode", ShortURLController.encodingURL);

export default routers;