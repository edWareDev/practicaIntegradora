
# Practica Integradora
Ultimos Cambios:
--
* En el EndPoint './chat' puedes acceder al chat. Me he esforzado en darle cosas interesantes para que sea más interactivo.
    * Recónoce los chats própios y los pone al lado derecho.
    * Genera una lista de correos participantes en el chat y te los muestra.
    * Se puede enviar mensajes con la tecla Enter.
    * La scrollbar solo aparece en la sección del chat.
    * La renderización de los chats es client-side completamente.
* En el EndPoint './products' puedes agregar productos a la base de datos.
* En el EndPoint './products' puedes editar productos de la base de datos.
* En el EndPoint './products' aun no es posible eliminar productos de la base de datos.

* En el EndPoint './' puedes crear carrito, agregar productos al carrito, ver los productos del carrito.
    * Es importate que para poder agregar productos al carrito, se seleccione un carrito primero.
    * Los productos se muestran en el carrito inmediatamene al agregarlos, ademas los ordena por el nombre del producto y calcula el total.
* El ID de los carritos registrados en la base de datos son sugeridos en el input.
* Está vinculada a la base de datos de MongoDB online, así que solo sera necesario el npm-test y podrás acceder a todos los datos.
* Ya está corregido los nombres de carpeta y todo para que se ajuste al PPT.

Cambios Anteriores:
---

* Usé la estructura similar a la que vimos en clase. Se que tengo que corregir el nombre de algunas carpetas para que coincida con el PPT.
* La ruta es ./products
* Algo adicional que hice es que solo se muestran los productos que tienen la propiedad status=true
* Aún me faltan algunas Cosas, pero no mucho(Web Sockets).