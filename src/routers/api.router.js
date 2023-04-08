import { Router } from "express";
import { postProductsController } from "../controllers/products.post.controller.js";

export const routerApi = Router();

routerApi.post('/products', postProductsController);
