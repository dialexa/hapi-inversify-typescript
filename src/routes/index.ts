import { ServerRoute as Route } from 'hapi';

import health from './health';
import v1 from './v1';

const routes: Route[] = [
  health,
  ...v1
];

export default routes;
