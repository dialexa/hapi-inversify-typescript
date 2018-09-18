import "reflect-metadata";

import { Container } from 'inversify';

import * as AuthTokenActions from 'src/actions/auth-token';
import * as ConfirmationActions from 'src/actions/confirmation';
import * as RegistrationActions from 'src/actions/registration';
import * as SessionActions from 'src/actions/session';
import * as UserActions from 'src/actions/user';

export const bind = (container: Container) => {
  AuthTokenActions.bind(container);
  ConfirmationActions.bind(container);
  RegistrationActions.bind(container);
  SessionActions.bind(container);
  UserActions.bind(container);
}
