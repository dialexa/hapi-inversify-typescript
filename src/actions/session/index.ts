import "reflect-metadata";

import { Container } from 'inversify';

import {
  IAuthenticateAction,
  ICreateSessionAction
} from 'src/types/actions';

import AuthenticateAction from './authenticate';
import CreateSessionAction from './create';

import Types from './types';

export const bind = (container: Container) => {
  container.bind<IAuthenticateAction>(Types.AuthenticateAction).to(AuthenticateAction).inRequestScope();
  container.bind<ICreateSessionAction>(Types.CreateSessionAction).to(CreateSessionAction).inRequestScope();
}
