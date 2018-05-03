var route = require("../model/route.js");
var QuestionSet = require("../model/question.js");
module.exports = function(app){

    route('html',app,'get', 'survey', getSurvey);
    route('html',app,'get', null, function(req, res) {res.render('home.html');});

    function getSurvey(req, res){
        var questions = new QuestionSet();
        questions.addQuestion('You often let your heart rule over your mind.');
        questions.addQuestion('You usually make plans before going out.');
        questions.addQuestion('You prefer fish over meat.');
        questions.addQuestion('You rather have a sleep over than a boardgame all-nighter.');
        questions.addQuestion('You rather kareoke than play video games.');
        questions.addQuestion('You like small groups over big crowds.');
        questions.addQuestion('You like wine over beer.');
        questions.addQuestion('You like to keep your friends close, and your enemies closer.');
        questions.addQuestion('You prefer to befriend people of the opposite sex.');
        questions.addQuestion('You prefer to befriend people much older or much younger than you.');
        questions.addQuestion('You find adulting to be difficult.');
        res.render('survey.html',{questions: questions.list});
    }

};