import { transports, createLogger, format } from "winston";
import os from "os";

const queryParams = [
  `dd-api-key=${process.env.DATADOG_API_KEY}`,
  "ddsource=nodejs",
  `service=${process.env.npm_package_name}`,
  `ddtags=env:${process.env.NODE_ENV},version:${process.env.npm_package_version}`,
  `hostname=${os.hostname()}`,
];

const logger = createLogger({
  level: "info",
  format: format.json(),
  exitOnError: false,
  defaultMeta: { timestamp: new Date() },
  transports: [
    new transports.Http({
      host: "http-intake.logs.datadoghq.com",
      path: `/api/v2/logs?${queryParams.join("&")}`,
      ssl: true,
    }),
    new transports.Console(),
  ],
});

logger.info("info", { $metadata: { user_id: 1, username: "john" } });

logger.warn("warn");

try {
  JSON.parse("");
} catch (error) {
  if (error instanceof Error) {
    logger.error(error.message, { $metadata: { error: error.stack } });
  }
}
