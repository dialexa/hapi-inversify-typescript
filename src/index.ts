import options from 'src/options';
import Server from 'src/server';

async function start() {
  const server = new Server(options);

  await server.init();
  await server.start();
}

start();
