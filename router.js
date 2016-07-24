var fs = require("fs"),
  mime = require("mime-types"),
  url = require("url"),
  path = require("path"),
  requestHandlers = require("./requestHandlers");

function getPathNameWithStat(queryName, outFunction)
{
  fs.stat(queryName, function(err,stats) {
    outFunction(err, queryName, stats);
  });
}



//routes the query of 'pathname' to the appropriate handler and hands
//off the response
function route(requestPath, response, assetsDirectory, requestID, logger)
{
  logger.log("About to route a request for " + requestPath, requestID);

  var uri = url.parse(requestPath).pathname;
  if(uri == "/") {
    uri = "/index.html";
  }
  var queryName = path.join(/*process.cwd(),*/ assetsDirectory, uri);

  var handler = "";

  logger.log("Searching for: " + queryName, requestID);
  getPathNameWithStat(queryName, function(err, foundName, stats) {

    //file found
    if(!(err))
    {
      logger.log("Found " + foundName + ".", requestID);
      requestHandlers.fileFound(response, foundName);
    }
    else if (err.code == 'ENOENT')
    {
      logger.log(err, requestID);
      logger.log("Could not find " + foundName, requestID);
      logger.log("Returning 404.", requestID);
      requestHandlers.notFound(response);
    }
    else
    {
      logger.log(err, requestID);
      logger.log("ERROR checking file " + foundName, requestID);
      logger.log("Returning 404.", requestID);
      requestHandlers.notFound(response);
    }


  });


}


exports.route = route;
