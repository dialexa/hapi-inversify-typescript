import * as cookies from 'hapi-auth-cookie';
import * as inert from 'inert';
import * as vision from 'vision';

import swagger from './swagger';

export default [
  cookies,
  inert,
  vision,

  swagger
];
