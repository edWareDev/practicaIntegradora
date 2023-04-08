import { productsManager } from "../manager/mongoose.products.manager.js";

export async function postProductsController(req, res, next) {
    const datosProductos = req.body;
    console.log(datosProductos);
    try {
        const result = await productsManager.addProduct(datosProductos);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error(error.message);   
        res.json({ error: '500 - Error while adding product' });
    }
}
