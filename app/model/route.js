var url = require("url");
//TODO add a callback feature
var apiRoute = function(app, method, uri, callback, args){
    var params = '';
    if(args !== null && typeof args !== 'undefined') params = args.join('/:');
    app[method](params ? url.resolve("/api/", uri, params) : url.resolve("/api/", uri), callback);
};
//TODO pass object templates and file name to render
var htmlRoute = function(app, method, uri, callback, args){
    var params = '';
    if(args !== null && typeof args !== 'undefined') params = args.join('/:');
    app[method](params ? url.resolve(uri, params) : uri, callback);
};

module.exports = function(type, app, method, uri, callback, args){
  return type === 'html' ? new htmlRoute(app, method, uri, callback, args) : new apiRoute(app, method, uri, callback, args);
};