import "reflect-metadata";

import { Container } from 'inversify';

import {
  IAuthenticateAction,
  ILoginAction
} from 'src/types/actions';

import AuthenticateAction from './authenticate';
import LoginAction from './login';

import Types from './types';

export const bind = (container: Container) => {
  container.bind<IAuthenticateAction>(Types.AuthenticateAction).to(AuthenticateAction).inRequestScope();
  container.bind<ILoginAction>(Types.LoginAction).to(LoginAction).inRequestScope();
}
