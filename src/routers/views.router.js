import { Router } from "express";
import { productsManager } from "../manager/mongoose.products.manager.js";
import { cartsManager } from "../manager/mongoose.carts.manager.js";

export const routerVistas = Router()

routerVistas.get('/', async (req, res, next) => {
    const products = await productsManager.getProducts();
    const carts = await cartsManager.getCarts()
    res.render('inicio', {
        cssName: 'inicio',
        pageTitle: 'Inicio',
        hayProducts: products.length > 0,
        products,
        hayCarts: carts.length > 0,
        carts
    });
});
routerVistas.get('/products', async (req, res, next) => {
    const products = await productsManager.getProducts();
    res.render('products', {
        cssName: 'products',
        pageTitle: 'Administrar Productos',
        hayProducts: products.length > 0,
        products
    });
});
