import mongoose from "mongoose"


const schemaCarts = new mongoose.Schema({
    products: { type: Object, required: false }
}, { versionKey: false })

class CartsManager {
    #cartsDb
    constructor() {
        this.#cartsDb = mongoose.model('carts', schemaCarts)
    }

    async getCarts() {
        try {
            const allCarts = await this.#cartsDb.find()
            return allCarts
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
    async addCart({ products }) {
        try {
            const newCart = {
                products: {}
            }
            const result = this.#cartsDb.create(newCart)
            return result
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
    async getCartByID(cartId) {
        try {
            const product = this.#cartsDb.findById(cartId).lean()
            return product;
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
    async addProductsToCart(cartId, productId) {
        try {
            const cart = this.getCartByID(cartId)
            const productSelected = cart.products.find(product => product.product === productId)
            if (productSelected) {
                productSelected.quantity++
            } else {
                this.#cartsDb.findOneAndUpdate({ _id: ObjectId(cartId) }, { products: { product: "p111", quantity: 1 } })
            }
            await cart.save()
            return cart.lean()
        } catch (error) {
            throw new Error('This cart does not exist');
        }
    }

    async deleteProductOfCart(cartId, productId) {
        try {
            const cart = this.getCartByID(cartId)
            const productSelected = cart.products.find(product => product.product === productId)
            if (productSelected) {
                this.#cartsDb.findOneAndUpdate({ _id: ObjectId(cartId) }, { products: { product: "p111", quantity: 0 } })
            }
            await cart.save()
            return cart.lean()
        } catch (error) {
            throw new Error('This cart does not exist');
        }
    }
}

export const cartsManager = new CartsManager()
