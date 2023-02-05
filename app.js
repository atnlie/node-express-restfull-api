let express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./src/routes/dataRoute');
const mldRoutes = require('./src/routes/middlewareRoute');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';
// const appRouter = express.Router();

// app.use(app);

// Setup JSON Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// appRouter.use(bodyParser.json());
// appRouter.use(bodyParser.urlencoded({extended: true}));

// Setup mongodb connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true
});

// routes setup
routes(app);

// mldRoutes(appRouter);

// MiddleWare
// app.get('/mw',
//     (req, res, next) => {
//         res.status(200);
//         console.log('Req Metode: ', req.method);
//         next();
//     }, (req, res, next) => {
//         res.status(200);
//         console.log('Req Original URL: ', req.originalUrl);
//         next();
//     }, (req, res, next) => {
//         res.status(200);
//         res.send('Request was successful');
//     });

// app.post('/mw',
//     (req, res, next) => {
//         res.status(200);
//         console.log('Req Metode: ', req.method);
//         next();
//     }, (req, res, next) => {
//         res.status(200);
//         console.log('Req Original URL: ', req.originalUrl);
//         next();
//     }, (req, res, next) => {
//         res.status(200);
//         res.send('Request was successful');
//     });

// middleware for error handler
app.use((req, res) => {
    res.status(404);
    res.send('<h1>Page not found</h1>');
})

// Server configuration
app.listen(PORT, HOST, () => {
    console.log(`Server Running on  http:/${HOST}:${PORT}`);
});