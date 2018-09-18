import { Request, Server as HapiServer, ServerOptions as Options } from 'hapi';
import { Container } from 'inversify';

import { SystemConfig } from 'src/config';
import container from 'src/container';
import plugins from 'src/plugins';
import routes from 'src/routes';

import { IAuthToken } from 'src/types/auth';

export default class Server {
  private server: HapiServer;

  constructor (options: Options) {
    this.server = new HapiServer(options);
  }

  public async init(): Promise<void> {
    // Decorate the request with the container
    this.server.decorate('request', 'container', (): Container => container);
    // Register plugins
    await this.server.register(plugins);
    // Initialize the routes
    routes.forEach(route => this.server.route(route));
    // Add an authentication strategy
    this.server.auth.strategy('session', 'cookie', {
      isSecure: false,
      clearInvalid: true,
      password: SystemConfig.COOKIE_SECRET,
      ttl: SystemConfig.SESSION_TTL,
      validateFunc: async (req: Request, session: IAuthToken) => {

        return { valid: true }
      }
    });
    // Define the default strategy
    this.server.auth.default('session');
  }

  public async start(): Promise<void> {
    await this.server.start();
    console.log('🚀 Server started at: ', this.server.info.port);
  }
}
