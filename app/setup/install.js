var path = require("path");
var User = require(path.join(__dirname, "../model/user.js"));

function generateUsers(qty){
    if(qty > 0){
        var qty = qty;
        var user = new User();
        user.addToFriends().then(function(result){
            generateUsers(qty-1);
        });
    } else {
          console.log('Sample data installed');
          process.exit(0);
    }
}
generateUsers(10);
