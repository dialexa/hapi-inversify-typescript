import * as Boom from 'boom';
import { Request, ResponseToolkit, ServerRoute as Route } from 'hapi';
import * as Joi from 'joi';

import Types from 'src/actions/user/types';
import { IRegisterUserAction } from 'src/types/actions';

import { AlreadyExistsError } from 'src/errors';

interface IRegistrationPayload {
  email: string,
  username: string,
  password: string
}

const routes: Route[] = [{
  method: 'POST',
  path: '/api/v1/registrations',
  options: {
    auth: false,
    tags: ['api'],
    validate: {
      payload: Joi.object().keys({
        email: Joi.string().email().trim().lowercase().required(),
        username: Joi.string().trim().lowercase().regex(/^[a-z0-9_]{3,15}$/).required(),
        password: Joi.string().min(6).max(128).required()
      })
    },
    handler: async (req: Request, h: ResponseToolkit) => {
      const container = req.container();
      const action = container.get<IRegisterUserAction>(Types.RegisterUserAction);

      try {
        await action.execute(req.payload as IRegistrationPayload);

        return h.response().code(200);
      } catch (err) {
        if (err instanceof AlreadyExistsError) { throw Boom.conflict(err.message); }

        throw err;
      }
    }
  }
}]

export default routes;
