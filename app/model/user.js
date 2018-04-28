var request = require("request");
var fs = require("fs");
var qs = require("qs");
var path = require("path");
var User = function(user){
    this.user = user;
};

User.prototype = {
    addToFriends: function(){

        var file = path.join(__dirname, '../data/friends.js');
        var lineCount = 0;
        var fileTransaction = new Promise(function(resolve, reject){
            //remove the last line from the file, as it is a closing array bracket
            fs.readFile(file, "utf8", function(err, friendData){
                if(err) reject(err);
                var lines = friendData.split("\n");
                lineCount = lines.length;
                lines.splice(-1,1);
                fs.writeFile(file, lines.join("\n"), function(err){
                    if(err) reject(err);
                    resolve(lineCount);
                });
            });
        });

        return fileTransaction.then(function(lineCount){
            var existingItems = lineCount > 2;
            return new Promise(function(resolve, reject){
                //remove the last line from the file, as it is a closing array bracket
                User.prototype.setUser().then(function(user){
                    var line = existingItems ? ", \n"+JSON.stringify(user)+"\n"+"]" : "\n"+JSON.stringify(user)+"\n"+"]";
                    fs.appendFile(file, line, function(err){
                        if(err) reject({error: err});
                        resolve({success: `Information saved: ${this.user}`});
                    });
                }).catch(function(err){
                    return err;
                });

            });
        }).then(function(result){
            return result;
        });
    },
    setUser: function(data){
        User.prototype.user = data;
        var user = User.prototype.user;
        return new Promise(function(resolve, reject){
            if( user === null || typeof user === 'undefined'){
                request('https://randomuser.me/api/', function(err, response, body){
                    if(!err && response.statusCode === 200){
                        user = JSON.parse(body).results[0];
                        resolve({random: user});
                    } else reject(err);
                });
            } else
                resolve({real: user});

        }).then(function(userdata){
            user = userdata;
            return new Promise(function(resolve, reject){
                var userdata = user.random === null ||  user.random === 'undefined' ? user.real : {
                    name: `${user.random.name.first} ${user.random.name.last}`,
                    photo: `${user.random.picture.medium}`,
                    scores: setScores(10, 5)
                };
                User.prototype.user = userdata;
                resolve(userdata);
            });
        }).catch(function(err){
            return err;
        });

        function setScores(qty, range){
            var scores = [];
            while(qty > 0){
                scores.push(Math.floor(Math.random() * range));
                qty--;
            }
            return scores;
        }
    },
    getUser: function(){
        return this.user;
    }
};

module.exports = User;