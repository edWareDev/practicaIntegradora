import { Router } from "express";
import { productsManager } from "../manager/mongoose.products.manager.js";

export const routerVistas = Router();
routerVistas.get('/', (req, res, next) => {
    res.redirect('./products');
});
routerVistas.get('/products', async (req, res, next) => {
    const products = await productsManager.getProducts()
    res.render('products', {
        pageTitle: 'Productos',
        hayProducts: products.length > 0,
        products
    });
});
