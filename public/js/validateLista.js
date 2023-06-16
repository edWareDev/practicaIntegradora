async function validateLista(lista, itemsHTML) {
    const estadoCpMapping = {
        '0': 'NO EXISTE',
        '1': 'ACEPTADO',
        '2': 'ANULADO',
        '3': 'AUTORIZADO',
        '4': 'NO AUTORIZADO'
    };

    for (let index = 0; index < lista.length; index++) {
        const item = lista[index];
        itemsHTML[index].querySelector('.estado').innerText = "En proceso";
        itemsHTML[index].querySelector('.resultado').innerText = "En proceso";
        document.querySelector('#current').innerHTML = index + 1;

        item.status = await runValidation(tokenData.access_token, item);
        const currenPercent = ((100 / lista.length) * (index + 1)) + '%';
        document.querySelector('.currentPos').style.width = currenPercent;

        if (item.status?.estadoCp) {
            itemsHTML[index].querySelector('.estado').innerText = estadoCpMapping[item.status.estadoCp];
            itemsHTML[index].querySelector('.observaciones').innerHTML = `<p title="${item.status.observaciones || 'Sin Observaciones'}">${item.status.observaciones || 'Sin Observaciones'}</p>`;
        } else if (!item.status.estadoCp) {
            index--; // Retrocede el índice en caso de que no haya un estadoCp válido
        } else if (item.status.success === false) {
            itemsHTML[index].querySelector('.estado').innerText = item.status.message;
        }

        itemsHTML[index].querySelector('.resultado').innerText = "Procesado";
    }

    return lista;
}
