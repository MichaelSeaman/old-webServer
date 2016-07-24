//var queryString = require("querystring");
var mime = require("mime-types");
var fs = require("fs");

//Request handler that reads file at 'pathname' and sends a 200 response
function fileFound(response, pathname)
{
  fs.readFile(pathname, function (error, contents) {
      response.writeHead(200, {"Content-Type" : mime.lookup(pathname)});
      response.write(contents);
      response.end();
    });
}

//Request handler sending 404 message
function notFound(response)
{
  response.writeHead(404, {"Content-Type" : "text/plain"});
  response.write("404 Not found\n");
  response.end();

}

exports.fileFound = fileFound;
exports.notFound = notFound;
