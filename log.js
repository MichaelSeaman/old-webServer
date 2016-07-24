dateTime = require("./dateTime");
fs = require('fs');


function createLogDirectory(dir)
{
  if (typeof(dir)==='undefined') dir = "logs";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log("Created directory " + dir);
  }
  return dir;
}

function createLogFile(dir, logFileName)
{
  //creates a logfile in directory dir, and outputs the pathname
  if (typeof(dir)==='undefined') dir = "logs";
  if (typeof(logFileName) === 'undefined') logFileName = "serverlog--" + dateTime.getDateTime();

  fs.writeFile(dir + "/" + logFileName, "\n" + logFileName + "\n\n");
  var pathname = dir + "/" + logFileName;
  console.log("Log File created at " + pathname);
  return pathname

}



function logTimeID(message, ID, logFile)
{
  logMessage = dateTime.getDateTime() + " ID: " + ID + ": "+ message;
  fs.appendFile(logFile, logMessage, function (err) {
    console.log(logMessage);
    if(err) {
      console.log("ERROR " + err);
    }
  });
}

var logger = function (printToConsole, printToLogFile, includeID, includeTimestamp)
{
    if (typeof(printToConsole)==='undefined') printToConsole = true;
    if (typeof(printToLogFile)==='undefined') printToLogFile = true;
    if (typeof(includeID)==='undefined') includeID = true;
    if (typeof(includeTimestamp)==='undefined') includeTimestamp = true;
    this.printToConsole = printToConsole;
    this.printToLogFile = printToLogFile;
    this.includeID = includeID;
    this.includeTimestamp = includeTimestamp;
    this.logFilePath = "";

    if(printToLogFile)
    {
      this.logFilePath = createLogFile(createLogDirectory());
    }
}

logger.prototype.log = function (message, ID) {
  var logMessage = "";
  if ( !(typeof(message) === 'undefined')) {

    if(this.includeTimestamp) {
      logMessage += dateTime.getDateTime() + ": ";
    }

    if(this.includeID && !(typeof(ID) === 'undefined') ) {
      logMessage +=  "ID: " + ID + ": ";
    }

    logMessage += message;
  }

  if(this.printToConsole) {
    console.log(logMessage);
  }

  if(this.printToLogFile) {
    fs.appendFile(this.logFilePath, logMessage + "\n", function (err) {
      if(err) {
        console.log("ERROR " + err);
      }
    });
  }
};



exports.logTimeID = logTimeID;
exports.createLogFile = createLogFile;
exports.createLogDirectory = createLogDirectory;
exports.logger = logger;
