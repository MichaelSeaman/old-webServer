var server = require("./server"),
  router = require("./router"),
  log = require("./log"),
  port = process.argv[2] || 8888,
  assetsDirectory = process.argv[3] || "assets";

//logger prints to console, log file, includes ID, doesn't include Timestamp
var logger = new log.logger(true, true, true, false);
//console.log("CWD: " +  process.cwd());


server.start(router.route, logger, port, assetsDirectory);
