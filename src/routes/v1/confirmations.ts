import * as Boom from 'boom';
import { Request, RequestQuery, ResponseToolkit, ServerRoute as Route } from 'hapi';
import * as Joi from 'joi';
import * as _ from 'lodash';

import Types from 'src/actions/user/types';
import { IConfirmUserAction } from 'src/types/actions';

import { NotFoundError } from 'src/errors';

const routes: Route[] = [{
  method: 'GET',
  path: '/api/v1/confirmations',
  options: {
    auth: false,
    tags: ['api'],
    validate: {
      query: Joi.object().keys({
        token: Joi.string().required(),
      })
    },
    handler: async (req: Request, h: ResponseToolkit) => {
      const container = req.container();
      const action = container.get<IConfirmUserAction>(Types.ConfirmUserAction);

      const token = _.get(req.query, 'token');

      try {
        await action.execute(token);

        return h.response().code(200);
      } catch (err) {
        if (err instanceof NotFoundError) { throw Boom.notFound(err.message); }

        throw err;
      }
    }
  }
}]

export default routes;
