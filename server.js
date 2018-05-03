var path = require("path");
var url = require("url");
var express = require("express");
var jquery = require.resolve('jquery');
global.jQuery = require('jquery');
global.$ = global.jQuery;
//documentation available at https://github.com/expressjs/body-parser
var bodyParser = require('body-parser');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Static file setup
app.use(express.static(__dirname + '/app/public'));
app.set('views', __dirname + '/app/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/css/styles',express.static(__dirname + '/app/public/assets/css/styles.css'));
app.use('/js',express.static(__dirname + '/app/public/assets/js/script.js'));
app.use('/js/jquery',express.static(jquery));
app.use('/js/chosen', express.static(require.resolve('chosen-js')));
app.use('/css/bootstrap',express.static(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.css'));
app.use('/js/bootstrap',express.static(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.bundle.js'));

//Routing
require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);

//Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT,function(){
    console.log("Server connected at port ",PORT);
});