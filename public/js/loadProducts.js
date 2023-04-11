const formCargarProductos = document.querySelector('#formCargarProductos');
if (formCargarProductos instanceof HTMLFormElement) {
    formCargarProductos.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(formCargarProductos);
        let data = {}
        formData.forEach((value, key) => { data[key] = value })
        // Thumbnail Por mientras vacio
        data.productThumbnail = null

        const response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        data = await response.json();
        if (!data.ok) {
            alert(data.error)
        }

    })
}

const editProductButton = document.querySelectorAll(".editProduct")

if (editProductButton instanceof NodeList) {
    editProductButton.forEach(e => {
        e.addEventListener("click", () => {
            console.log('editar: ' + e.parentElement.parentElement.getAttribute('id'));
        })
    })
}
