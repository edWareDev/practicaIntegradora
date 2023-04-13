import mongoose from "mongoose"
import { Product } from "../entities/product.js"
import { schemaProducts } from "./models/schemaProducts.js"

class ProductsManager {
    #productsDb
    constructor() {
        this.#productsDb = mongoose.model('products', schemaProducts)
    }
    async getProducts() {
        try {
            const allProducts = await this.#productsDb.find().lean()
            return allProducts
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
    async addProduct(product) {
        if (!product.productName || !product.productDescription || !product.productPrice || !product.productStatus || !product.productCategory || !product.productCode || !product.productStock) {
            throw new Error('All fields are required')
        } else {
            const allProducts = await this.getProducts();
            const newProduct = new Product(product)
            if (allProducts.find(product => product.productCode === newProduct.productCode)) {
                throw new Error('Product code already exists')
            } else {
                if (typeof (newProduct.productStatus) !== 'boolean') {
                    newProduct.productStatus = true;
                }
                const result = this.#productsDb.create(newProduct)
                return result
            }
        }
    }
    async getProductByID(id) {
        try {
            const product = this.#productsDb.findById(id).lean()
            return product;
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
    async updateProduct(productId, newProps) {
        try {
            const product = await this.#productsDb.findOneAndUpdate(
                { _id: productId },
                { $set: newProps },
                { returnOriginal: false }
            ).catch((error) => {
                throw new Error({ error: error.message });
            });
            return product;
        } catch (error) {
            throw new Error({ error: error.message });
        }
        // const allProducts = await this.getProducts();
        // const productIndex = allProducts.findIndex(product => product.id === id);
        // if (productIndex !== -1) {
        //     allProducts[productIndex] = { ...allProducts[productIndex], ...newProps, ...{ "id": id } };
        //     await fs.writeFile(this.path, JSON.stringify(allProducts, null, 2))
        //     console.log('Changes has been changed succesfully');
        //     return allProducts[productIndex];
        // } else {
        //     throw new Error('This product does not exist');
        // }
    }
    async deleteProduct(id) {
        const allProducts = await this.getProducts();
        const productIndex = allProducts.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            const deletedProduct = allProducts[productIndex];
            allProducts.splice(productIndex, 1);
            await fs.writeFile(this.path, JSON.stringify(allProducts, null, 2))
            console.log('This product has been deleted');
            return deletedProduct;
        } else {
            throw new Error('This product does not exist');
        }
    }
}

export const productsManager = new ProductsManager()