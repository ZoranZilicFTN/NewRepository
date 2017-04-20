import {GLODate as ZCV } from "./GLODate";

let myValidator = new ZCV();

import winston = require('winston');
import fs = require('fs');
const env = process.env.NODE_ENV || 'development';

//COLORS -- i need this to paint whole line of console.log(-----)
var   Reset = "\x1b[0m";
var   Bright = "\x1b[1m";
var   FgRed = "\x1b[31m";
var   FgGreen = "\x1b[32m";
var   FgOrange = "\x1b[33m";
var   FgBlue = "\x1b[34m";
var   FgPurple = "\x1b[35m";
var   FgCyan = "\x1b[36m";


//CLASS GLONpmWinston
class GLONpmWinston {

    constructor(gloErr) {
        this.logError(gloErr);
        this.logInfo(gloErr);
        this.logWarning(gloErr);
    }

    //CREATE LOG.log FILE =======================================================================
    createLogFile(){
        const logDir = 'log';

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        //importing a date on every output line
        const tsFormat = () => (new ZCV()).momentDate();
        const logger = new (winston.Logger)({
            transports: [
                // colorize the output to the console
                new (winston.transports.Console)({
                    timestamp: tsFormat,
                    colorize: true,
                    level: 'info'
                }),
                new (winston.transports.File)({
                    filename: `${logDir}/results.txt`,
                    timestamp: tsFormat,
                    level: env === 'development' ? 'debug' : 'info'
                })
            ]
        });

        logger.level = 'debug';

        logger.info( ' Hello INFO ',);
        logger.error(' puop up ERROR ');
    }

    //LOGERROR ==================================================================================
    logError(gloErr) {

        this.createLogFile();

        console.log("\n---------------------------------------------------------logErr_method");
        console.log(FgRed, "This log ERROR time is: ");
        console.log(FgPurple, myValidator.momentDate() + " time");
        console.log(Reset);

        if(gloErr)
        {
            winston.error(FgOrange, gloErr  , Reset);
        }
    }


    //LOGINFO ====================================================================================
    logInfo(gloErr) {

        this.createLogFile();

        console.log("\n---------------------------------------------------------logInfo_method");
        console.log(FgRed, "This log INFO time is: ");
        console.log(FgPurple, myValidator.momentDate() + " time");
        console.log(Reset);


        if(gloErr)
        {
            winston.error(FgCyan,  gloErr, Reset);
        }
    }



    //LOGWARNING ====================================================================================
    logWarning(gloErr) {

        this.createLogFile();

        console.log("\n---------------------------------------------------------logwarning_method");
        console.log(FgRed, "This log WARNING time is: ");
        console.log(FgPurple, myValidator.momentDate() + " time");
        console.log(Reset);


        if(gloErr)
        {
            winston.error(Bright, gloErr , Reset);
        }
    }
}

export { GLONpmWinston };
