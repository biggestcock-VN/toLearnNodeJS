const path = require('path');
const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const port = 3000;
const morgan = require('morgan');
const methodOverride = require('method-override')

const routes = require('./routes');
const db = require('./config/db')
//conncet to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'))
//http logger
//app.use(morgan('combined'))

//template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

//route init
    routes(app);

app.listen(port, () => console.log('learning app')); //start a web server
