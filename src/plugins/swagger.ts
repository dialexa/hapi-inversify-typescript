import * as Swagger from 'hapi-swagger';

export default {
  plugin: Swagger,
  options: {
    info: {
      title: 'API Documentation',
      version: process.env.npm_package_version
    }
  }
}
