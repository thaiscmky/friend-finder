var fs = require("fs");
module.exports = function(app){
    var route = require("../model/route.js");
    var friends = fs.readFileSync('./app/data/friends.js', "utf-8");
    route('api',app,'get', 'friends', getFriends);
    function getFriends(req, res){
        res.json(JSON.parse(friends));
    }

};