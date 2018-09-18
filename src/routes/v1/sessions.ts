import * as Boom from 'boom';
import { Request, ResponseToolkit, ServerRoute as Route } from 'hapi';
import * as Joi from 'joi';

import AuthTokenTypes from 'src/actions/auth-token/types';
import SessionTypes from 'src/actions/session/types';

import { ICreateSessionAction, IDestroyAuthTokenAction } from 'src/types/actions';
import { IAuthToken } from 'src/types/auth-token';

import { InvalidPasswordError, NotConfirmedError, NotFoundError } from 'src/errors';

interface ILoginPayload {
  email?: string,
  username?: string,
  password: string
}

const routes: Route[] = [
  {
    method: 'POST',
    path: '/api/v1/sessions',
    options: {
      auth: false,
      tags: ['api'],
      validate: {
        payload: Joi.object().keys({
          email: Joi.string().email().trim().lowercase(),
          username: Joi.string().trim().lowercase().regex(/^[a-z0-9_]{3,15}$/),
          password: Joi.string().min(6).max(128).required()
        }).xor('email', 'username')
      },
      handler: async (req: Request, h: ResponseToolkit) => {
        const container = req.container();
        const action = container.get<ICreateSessionAction>(SessionTypes.CreateSessionAction);

        try {
          const authToken = await action.execute(req.payload as ILoginPayload);
          req.cookieAuth.set(authToken);

          return h.response().code(200);
        } catch (err) {
          if (err instanceof NotFoundError) { throw Boom.unauthorized(); }
          if (err instanceof InvalidPasswordError) { throw Boom.unauthorized(); }
          if (err instanceof NotConfirmedError) { throw Boom.unauthorized(); }

          throw err;
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/v1/sessions',
    options: {
      tags: ['api'],
      handler: async (req: Request, h: ResponseToolkit) => {
        const container = req.container();
        const action = container.get<IDestroyAuthTokenAction>(AuthTokenTypes.DestroyAuthTokenAction);

        await action.execute(req.auth.credentials as IAuthToken);
        req.cookieAuth.clear();

        return h.response().code(204);
      }
    }
  }
]

export default routes;
