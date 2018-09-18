import { Request, ResponseToolkit, ServerRoute as Route } from 'hapi';

const route: Route = {
  method: 'GET',
  path: '/health',
  options: {
    tags: ['api'],
    handler (req: Request, h: ResponseToolkit) {
      return { version: process.env.npm_package_version }
    }
  }
}

export default route;
