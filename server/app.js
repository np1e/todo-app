const express = require("express");
const logger = require('morgan');
const nunjucks = require('nunjucks');
require('dotenv').config();

const router = require('./routes');

const app = express();
const port = process.env.PORT;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(express.static('static'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'njk');

app.use('/', router);

app.listen(port, () => {
    console.log(`Node JS server listening on port ${port}`);
});
