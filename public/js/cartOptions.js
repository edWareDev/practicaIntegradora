const addToCartButton = document.querySelectorAll(".addToCart")
const updateCartButton = document.querySelector(".updateCart")

updateCartButton.addEventListener("click", () => getCartByID())

async function getCartByID() {
    try {
        let cartID = document.querySelector('#cartID').value.trim()
        if (cartID === '') {
            console.error('No ha ingresado ningún ID de carrito')
        } else {
            const response = await fetch(`/api/carts/${cartID}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const productsOfCart = await response.json();
            drawCart(productsOfCart)
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

if (addToCartButton instanceof NodeList) {
    addToCartButton.forEach(a => {
        a.addEventListener("click", async () => {
            let cartID = document.querySelector('#cartID').value.trim()
            if (cartID === '') {
                console.error('No ha ingresado ningún ID de carrito')
            } else {
                const idProduct = a.parentNode.getAttribute('id')
                try {
                    const request = await fetch(`/api/carts/${cartID}/product/${idProduct}`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    let cart = await request.json();
                    drawCart(cart.products)
                } catch (error) {
                    console.error(error);
                }
            }
        })
    })
}

async function drawCart(products) {
    const allProductsOfCart = await Promise.all(products.map(async (item) => {
        const response = await fetch(`/api/products/${item.product}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        data.quantity = item.quantity;
        return data;
    }));
    allProductsOfCart.sort((a, b) => (a.productName > b.productName) ? 1 : -1)
    const template = `
    {{#each products}}
    <article class="card" id="{{this._id}}">
        <div class="card--data">
            <h3>{{this.productName}} - <small>US$</small>{{this.productPrice}} (cant:{{this.quantity}})</h3>
        </div>
        <button title="Quitar del Carrito" class="removeFromCart">
            <i class="fa-solid fa-cart-arrow-down"></i>
        </button>
    </article>
    {{/each}} `;

    const renderProducts = Handlebars.compile(template);
    document.querySelector(".cartItems").innerHTML = renderProducts({ products: allProductsOfCart });
}
