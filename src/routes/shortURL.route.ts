import express from "express";
import ShortURLController from "../controllers/shortURL.controller";

const routers = express.Router();

routers.post("/encode", ShortURLController.encodingURL);

routers.post("/decode", ShortURLController.decodingURL);

export default routers;