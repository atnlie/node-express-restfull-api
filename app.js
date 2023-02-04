let express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';
const routes = require('./src/routes/dataRoute');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Setup JSON Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// Setup mongodb connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true
});

routes(app);

// MiddleWare
app.get('/mw',
    (req, res, next) => {
        console.log('Req Metode: ', req.method);
        next();
    }, (req, res, next) => {
        console.log('Req Original URL: ', req.originalUrl);
        next();
    }, (req, res, next) => {
        res.send('Request was successful');
    });

app.post('/mw',
    (req, res, next) => {
        console.log('Req Metode: ', req.method);
        next();
    }, (req, res, next) => {
        console.log('Req Original URL: ', req.originalUrl);
        next();
    }, (req, res, next) => {
        res.send('Request was successful');
    });

// Server configuration
app.listen(PORT, HOST, () => {
    console.log(`Server Running on  http:/${HOST}:${PORT}`);
});