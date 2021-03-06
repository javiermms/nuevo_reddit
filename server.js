require('dotenv').config();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var exphbs = require('express-handlebars');
const express = require('express')
const Post = require('./models/post');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express()
const port = 3000

//Cookie Parser
app.use(cookieParser());

// Handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use Express Validator
app.use(expressValidator());

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }
  
    next();
};
app.use(checkAuth);

require('./controllers/auth.js')(app);
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./data/nuevo-reddit-db');

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;