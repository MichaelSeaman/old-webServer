var http = require("http");



function start(route, logger, port, assetsDirectory) {
  var requestID = -1;
  function onRequest(request, response)
  {
    var postData = "";

    var requestPath = request.url;
    logger.log(response);
    logger.log("Request from ");
    logger.log("Request for " + requestPath + " received.", ++requestID);

    route(requestPath, response, assetsDirectory, requestID, logger);

  }

  http.createServer(onRequest).listen(port);
  logger.log("Server Started on port " + port + " using assets from ./" + assetsDirectory + " .");

}

exports.start = start;
