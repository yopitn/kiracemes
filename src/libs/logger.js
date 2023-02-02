const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YY-MM-DD HH:mm:ss" }),
    winston.format.simple(),
    winston.format.printf((log) => winston.format.colorize().colorize(log.level, `[${log.timestamp}] - [${log.level.toUpperCase()}]: ${log.message}`))
  ),
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/combined.log"),
    }),
  ],
});

module.exports = logger;
