// app.js
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');


const mongoose = require('mongoose');
if (process.env.DB_URI.includes("supperclub-prod")) {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: false,
        ssl: true,
        sslValidate: false,
        sslCA: fs.readFileSync('/rds-combined-ca-bundle.pem')})
    .then(() => console.log('Connection to DB successful'))
    .catch((err) => console.error(err,'Error'));
} else {
    mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connection to DB successful'))
    .catch((err) => console.error(err,'Error'));
}
mongoose.Promise = global.Promise;

const product = require('./routes/product.route'); 
const main = require('./routes/main.route');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', main);
app.use('/products', product);

let port = 80;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

