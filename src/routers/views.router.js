import { Router } from "express";
import { productsManager } from "../manager/mongoose.products.manager.js";

export const routerVistas = Router()

routerVistas.get('/', async (req, res, next) => {
    const products = await productsManager.getProducts();
    res.render('inicio', {
        cssName: 'inicio',
        pageTitle: 'Inicio',
        hayProducts: products.length > 0,
        products
    });
});
routerVistas.get('/products', async (req, res, next) => {
    const products = await productsManager.getProducts();
    res.render('products', {
        cssName: 'products',
        pageTitle: 'Productos',
        hayProducts: products.length > 0,
        products
    });
});
