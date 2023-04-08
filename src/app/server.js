import express from "express";
import { PORT } from "../config/server.config.js";
import { engine } from "express-handlebars";
import { routerApi } from "../routers/api.router.js";
import { routerVistas } from "../routers/views.router.js";
import { conectar } from "../database/mongoose.js";

const app = express();

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))
app.use(express.json())

app.use('/api', routerApi)
app.use('/', routerVistas)

await conectar()
app.listen(PORT, () => { console.log(`Conectado al servidor mediante el puerto: ${PORT}`); });