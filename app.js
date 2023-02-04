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

// setup schema
const schemas = require('./src/models/dataModel');
const personModel = mongoose.model('employee', schemas.personSchema);

app.post('/newEmployee', (req, res) => {
    let employee = new personModel(req.body);
    console.log(`Ini apa: ${employee}`);
    employee.save((err, personModel) => {
        if (err) {
            res.send(err);
        }
        res.json(employee);
    })
});

/*
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
*/

routes(app, mongoose, schemas);

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
    let val = req.query.name;
    console.log('PARAM adalah ' + val);
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