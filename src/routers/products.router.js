import { Router } from 'express';
import { postProductsController } from "../controllers/products.post.controller.js";
import { productsManager } from '../manager/mongoose.products.manager.js';

export const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    const queryParams = req.query;
    const allProducts = await productsManager.getProducts()
    const resultado = [];

    if (queryParams.limit) {
        for (let product = 0; product <= queryParams.limit - 1; product++) {
            if (allProducts[product]) {
                resultado.push(allProducts[product]);
            }
        }
        res.json(resultado);
    } else {
        res.json(allProducts)
    }
})

productsRouter.post('/', postProductsController)

productsRouter.get('/:pid', async (req, res) => {
    const productId = req.params.pid
    const product = await productManager.getProductByID(productId)
    if (!productId || !product) {
        res.status(400).json({ error: "ID dont exist" })
    } else {
        res.json(product)
    }

})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const newProps = await productManager.updateProduct(req.params.pid, req.body)
        res.json(newProps)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const deletedProduct = await productManager.deleteProduct(req.params.pid)
        res.json(deletedProduct)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})