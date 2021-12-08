const express = require("express");
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const router = require('./routes');

const app = express();
const port = process.env.PORT;

app.use(express.static('static'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: /http(s)?:\/\/localhost:\d{4}/,
    methods: ['GET', 'POST', 'DELETE']
}));

app.use('/', router);

app.listen(port, () => {
    console.log(`Node JS server listening on port ${port}`);
});
