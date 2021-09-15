const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override')
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/sortMiddleware')

const route = require('./routes');
const db = require('./config/db');

// connect to db
db.connect()

// use static files
app.use(express.static(path.join(__dirname, 'public')));

// handle form type
// giúp bắt dữ liệu submit từ form lên
app.use(express.urlencoded({ extended: true }));
// handle code from js
app.use(express.json());

// handle method override
app.use(methodOverride('_method'))

// custom middlewares
app.use(SortMiddleware)

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./helpers/handlebars')
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
