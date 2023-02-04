let express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';

app.get('/', (req, res) => {
    res.send(`Welcome to node server!`);
});

app.listen(PORT, HOST, () => {
   console.log(`Server Running on  http:/${HOST}:${PORT}`);
});