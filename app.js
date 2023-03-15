const express = require('express');
const connection = require('./config/db-connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const http = require('http');
const compression = require('compression');
const dotenv = require('dotenv');
var CronJob = require('cron').CronJob;
var fs = require('fs-extra');
 
dotenv.config();

//Route importation.

const company = require('./routes/companys');
const companygroup = require('./routes/companygroups');
const companyunits = require('./routes/companyunitss');
const employee = require('./routes/employees');
const family = require('./routes/familys');
const orderin = require('./routes/orderins');
const orderout = require('./routes/orderouts');
const product = require('./routes/products');
const project = require('./routes/projects');
const project_service = require('./routes/project_services');
const provider = require('./routes/providers');
const service = require('./routes/services');
const service_employee = require('./routes/service_employees');
const si_alerta = require('./routes/si_alertas');
const si_device = require('./routes/si_devices');
const si_log = require('./routes/si_logs');
const si_modulo = require('./routes/si_modulos');
const si_permiso = require('./routes/si_permisos');
const si_rol = require('./routes/si_rols');
const si_rol_permiso = require('./routes/si_rol_permisos');
const si_sesion = require('./routes/si_sesions');
const si_sesionestado = require('./routes/si_sesionestados');
const si_user = require('./routes/si_users');
const si_user_rol = require('./routes/si_user_rols');
const solicitudeprovider = require('./routes/solicitudeproviders');
const solicitudeprovider_product = require('./routes/solicitudeprovider_products');
const solicitudewarehouse = require('./routes/solicitudewarehouses');
const solicitudewarehouse_product = require('./routes/solicitudewarehouse_products');
const validation = require('./routes/validations');
const vehicle = require('./routes/vehicles');
const warehouse = require('./routes/warehouses');
const appModel = require('./routes/apps');
/* const stripe = require('./routes/stripe'); */

const subdomain = '';
// const subdomain = '/';

// Express Instance
const app = express();

app.use(function (req, res, next) {
    req.mysql = connection;
    next();
});
// Stripe here because bodyParser is intefering with the body raw format
/* app.use(subdomain + '/api/stripe', stripe); */

// Middlewares
app.use(bodyParser.urlencoded({
    limit: '1000mb',
    extended: false
}));
app.use(bodyParser.json({limit: '1000mb'}));
app.use(express.json());
app.use(cors());
app.use(express.static('./public'));
app.use(compression());
app.use(morgan('dev'));
app.use(passport.initialize());

const _cors = {
    origin: ['http://localhost:4200', 'http://localhost:8000', 'http://127.0.0.1:8000', 'https://plataforma-x.com', 'http://plataforma-x.com']
}
app.all('*', function(req, res, next) {
    console.log('req.headers.origin', req.headers.origin);
    let origin = req.headers.origin;
    if (_cors.origin.indexOf(origin) >= 0) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE, PATCH');
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// Call passport Strategy
require('./config/passport')(passport);


app.use(subdomain + '/api/company', company);
app.use(subdomain + '/api/companygroup', companygroup);
app.use(subdomain + '/api/companyunits', companyunits);
app.use(subdomain + '/api/employee', employee);
app.use(subdomain + '/api/family', family);
app.use(subdomain + '/api/orderin', orderin);
app.use(subdomain + '/api/orderout', orderout);
app.use(subdomain + '/api/product', product);
app.use(subdomain + '/api/project', project);
app.use(subdomain + '/api/project_service', project_service);
app.use(subdomain + '/api/provider', provider);
app.use(subdomain + '/api/service', service);
app.use(subdomain + '/api/service_employee', service_employee);
app.use(subdomain + '/api/si_alerta', si_alerta);
app.use(subdomain + '/api/si_device', si_device);
app.use(subdomain + '/api/si_log', si_log);
app.use(subdomain + '/api/si_modulo', si_modulo);
app.use(subdomain + '/api/si_permiso', si_permiso);
app.use(subdomain + '/api/si_rol', si_rol);
app.use(subdomain + '/api/si_rol_permiso', si_rol_permiso);
app.use(subdomain + '/api/si_sesion', si_sesion);
app.use(subdomain + '/api/si_sesionestado', si_sesionestado);
app.use(subdomain + '/api/si_user', si_user);
app.use(subdomain + '/api/si_user_rol', si_user_rol);
app.use(subdomain + '/api/solicitudeprovider', solicitudeprovider);
app.use(subdomain + '/api/solicitudeprovider_product', solicitudeprovider_product);
app.use(subdomain + '/api/solicitudewarehouse', solicitudewarehouse);
app.use(subdomain + '/api/solicitudewarehouse_product', solicitudewarehouse_product);
app.use(subdomain + '/api/validation', validation);
app.use(subdomain + '/api/vehicle', vehicle);
app.use(subdomain + '/api/warehouse', warehouse);

app.use(subdomain + '/api/app', appModel);

// WEBSOCKET
var clients = {};

var server = http.createServer(app);
var io = require("socket.io").listen(server, { origins: '*:*'});

server.listen(process.env.PORT || 3000, () => {
    console.log(' [*] Listening on 0.0.0.0:' + (process.env.PORT));
});
io.on("connect", (socket) => {
    console.log("Connected client on port %s.");
    clients[socket.id] = socket;

    socket.on("message", (message) => {
        console.log("[server](message): %s", JSON.stringify(message));
        io.emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});


/*** REMUEVE ARCHIVOS CADUCADOS
new CronJob('00 00 00 * * * *', function() {

    var fecha = new Date();
    console.log('Job Runed Every Midnight:', fecha);

    // ELIMINAR REGISTROS VIEJOS
    var fechaAnterior = fecha.setDate(fecha.getDate() -60);
    var fechaSeteada = new Date(fechaAnterior);
    let month = fechaSeteada.getMonth() + 1;
    let day = fechaSeteada.getDate();
    let year = fechaSeteada.getFullYear();
    if (+month < 10) {
        month = "0" + month.toString();
    }
    if (+day < 10) {
        day = "0" + day.toString();
    }
    var fechaformateada = `${year}-${month}-${day}`;

    // LIMPIA LOGS
    query = 'DELETE FROM log WHERE created_at < ?';
    keys = [fechaformateada];

    connection.query(query, keys, (error, log) => {
        if(error) 
          console.error("ERROR. Un error ha ocurrido mientras la rutina diaria se ejecutaba - ELIMINAR LOGS VIEJOS");
        else {
          console.log("Rutina diaria ejecutada - ELIMINAR LOGS VIEJOS", log);
        }
    });


}, null, true, 'America/Mexico_City');
*/
