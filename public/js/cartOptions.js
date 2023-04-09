const addToCartButton = document.querySelectorAll(".addToCart")

async function getCarts() {
    try {
        const response = await fetch('/api/carts?limit=5');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

getCarts();


if (addToCartButton instanceof NodeList) {
    addToCartButton.forEach(a => {
        a.addEventListener("click", async () => {
            const cartID = document.querySelector('#cartID').value.trim()
            if (cartID === '') {
                console.error('No ha ingresado ningún ID de carrito')
            } else {
                const idProduct = a.parentNode.getAttribute('id')
                console.log('Agragar al Carrito: ' + idProduct);
                console.log(cartID);
                try {
                    const response = await fetch(`/api/carts/${cartID}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            }
        })
    })
}