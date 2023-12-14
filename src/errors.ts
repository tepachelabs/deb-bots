import Rollbar from "rollbar";
import Transport, {TransportStreamOptions} from 'winston-transport';

import {execSync} from 'child_process';
import logger from "./logger";

let codeVersion = process.env.GIT_COMMIT || execSync('git rev-parse HEAD').toString().trim();

const rollbarConfiguration = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    code_version: codeVersion,
  }
};

const rollbar = new Rollbar(rollbarConfiguration);

class RollbarTransport extends Transport {
  rollbar: Rollbar;

  constructor(opts: TransportStreamOptions, configuration: Rollbar.Configuration) {
    super(opts);
    this.rollbar = new Rollbar(configuration);

    this.level = opts.level || 'warn';
  }

  log(info: any, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const message = info.message;
    const level = info[Symbol.for('level')];
    const meta = Object.assign({}, info);

    if (level === 'error') {
      this.rollbar.error(message, meta, callback);
    } else if (level === 'warn') {
      this.rollbar.warning(message, meta, callback);
    } else if (level === 'info') {
      this.rollbar.info(message, meta, callback);
    } else if (level === 'debug') {
      this.rollbar.debug(message, meta, callback);
    } else {
      this.rollbar.info(message, meta, callback);
    }

    callback();
  }
}


if (rollbar) {
  logger.add(new RollbarTransport({}, rollbarConfiguration));
}

export const apiErrorHandler = rollbar.errorHandler;
