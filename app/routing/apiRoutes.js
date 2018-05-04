var fs = require("fs");
var $ = require('jquery');
module.exports = function(app){

    var route = require("../model/route.js");
    var friends = JSON.parse(fs.readFileSync('./app/data/friends.js', "utf-8"));

    route('api',app,'get', 'friends', getFriends);
    route('api',app,'post', 'friends', getMatch);

    function getFriends(req, res){
        res.json(friends);
    }

    function getMatch(req, res){
        var bestmatch = null;
        var userScore = getTotalSum(req.body);

        //sort by most compatible match to least compatible
        friends.sort(function(a, b){
            var sumA = a['scores'].reduce(addScore);
            var sumB = b['scores'].reduce(addScore);
            return Math.abs(userScore - sumA) - Math.abs(userScore - sumB);
        });

        res.json(friends[0]);
    }

    function getTotalSum(request){
        var scoreArr = [];

        for (var key in request) {
            if( request.hasOwnProperty(key) && key.match("^score")) {
                scoreArr.push(parseInt(request[key]));
            }
        }
        return scoreArr.reduce(addScore);
    }

    function addScore( accumulative, value){
        return accumulative+value;
    }

};