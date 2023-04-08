import mongoose from "mongoose"
import { Product } from "../entities/product.js"

const schemaProductos = new mongoose.Schema({
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productStatus: { type: Boolean, required: true },
    productCategory: { type: String, required: true },
    productThumbnail: { type: Array, required: false },
    productCode: { type: String, required: true },
    productStock: { type: Number, required: true }
}, { versionKey: false })

class ProductsManager {
    #productsDb
    constructor() {
        this.#productsDb = mongoose.model('products', schemaProductos)
    }
    async getProducts() {
        try {
            const allProducts = this.#productsDb.find().lean()
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
                // newProduct.productThumbnail.forEach(element => {
                //     if (element.type === 'Buffer') {
                //         const blob = new Blob(element.data, { type: 'image/*' });
                //         const imageUrl = URL.createObjectURL(blob);
                //         console.log(imageUrl);
                //     }
                // });
                const result = this.#productsDb.create(newProduct)
                return result
            }
        }
    }
    async getProductByID(id) {
        try {
            const product = this.#productsDb.findById().lean()
            return product;
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
    async updateProduct(id, newProps) {
        const allProducts = await this.getProducts();
        const productIndex = allProducts.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            allProducts[productIndex] = { ...allProducts[productIndex], ...newProps, ...{ "id": id } };
            await fs.writeFile(this.path, JSON.stringify(allProducts, null, 2))
            console.log('Changes has been changed succesfully');
            return allProducts[productIndex];
        } else {
            throw new Error('This product does not exist');
        }
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