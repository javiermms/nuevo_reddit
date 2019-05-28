var exphbs = require('express-handlebars');
const express = require('express')
const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

//INDEX
app.get('/', (req, res) => {
    res.render('index', {});
});


app.listen(port, () => console.log(`App listening on port ${port}!`))