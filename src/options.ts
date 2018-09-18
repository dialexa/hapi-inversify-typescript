import { ServerOptions as Options } from 'hapi';

const options: Options = {
  host: '0.0.0.0',
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  debug: {
    log: ['request']
  },
  router: {
    isCaseSensitive: false,
    stripTrailingSlash: true
  },
  routes: {
    cors: {
      credentials: true,
      additionalHeaders: [ 'Origin' ],
      origin: [ '*' ]
    },
    validate: {
      options: {
        abortEarly: false
      }
    }
  }
}

export default options;
