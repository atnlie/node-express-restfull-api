let express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';
const routes = require('./src/routes/dataRoute');
const mongoose = require('mongoose');

// Setup mongodb connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true
});

//model
const Person = mongoose.model(
    'Person', {
        name: String,
        age: Number,
        hobby: String,
    }
);

const employee = new Person({
    name: 'Anton',
    age: '17',
    hobby: 'jalan-jalan naik mobil'
});

employee.save()
    .then((res) => {
        console.log(`res: ${res}`)
        console.log('Done');
    }
);

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

// Create route in the root
app.get('/', (req, res) => {
    res.send(`Welcome to node server!`);
});

app.post('/', (req, res) => {
    res.send('Post Method to node server!');
});

app.put('/', (req, res) => {
    res.send('Put Method to node server!');
});

app.delete('/', (req, res) => {
    res.send('Delete Method to node server!');
});

app.patch('/', (req, res) => {
    res.send('Patch Method to node server!');
});


// Server configuration
app.listen(PORT, HOST, () => {
   console.log(`Server Running on  http:/${HOST}:${PORT}`);
});