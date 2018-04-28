var path = require("path");
var express = require("express");
//documentation available at https://github.com/expressjs/body-parser
var bodyParser = require('body-parser');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'/app/public')));
//Static file setup
app.set('views', path.join(__dirname,'/app/public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname,'/app/public')));
app.use('/css',express.static(path.join(__dirname, '/app/public/assets/style.css')));
app.use('/js',express.static(path.join(__dirname, '/public/assets/script.js')));
app.use('/css/bootstrap',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css/bootstrap.css')));
app.use('/js/bootstrap',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/js/bootstrap.bundle.js')));

//Routing
require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);

//Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT,function(){
    console.log("Server connected",PORT);
});