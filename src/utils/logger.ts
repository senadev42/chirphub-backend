import { transports, format } from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { Format } from 'logform';

export const LoggerFactory = (appName: string) => {
  let consoleFormat: Format;

  const DEBUG = process.env.DEBUG || 'debug';

  consoleFormat = format.combine(
    format.timestamp(),
    format.ms(),
    nestWinstonModuleUtilities.format.nestLike(appName, {
      colors: true,
      prettyPrint: true,
    }),
  );

  return WinstonModule.createLogger({
    level: DEBUG ? 'debug' : 'info',
    transports: [
      new transports.Console({ format: consoleFormat }),
      new transports.File({
        filename: 'app.log',
        level: DEBUG ? 'debug' : 'info', 
        format: format.combine(
          format.timestamp(),
          format.json(), 
        ),
      }),
    ],
  });
};
