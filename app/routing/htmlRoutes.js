var route = require("../model/route.js");
module.exports = function(app){

   /* app.get("*", function(req, res) {
        res.render('home.html');
    });*/
    route('html',app,'get', null, function(req, res) {res.render('home.html');});
    route('html',app,'get', 'survey', getSurvey);

    function getSurvey(req, res){
        res.render('survey.html',{});
    }

};