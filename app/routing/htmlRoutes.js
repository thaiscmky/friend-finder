var route = require("../model/route.js");
module.exports = function(app){

    route('html',app,'get', 'survey', getSurvey);
    //route('html',app,'get', null, function(req, res) {res.render('home.html');});

    function getSurvey(req, res){
        res.render('survey.html',{});
    }

};