import "reflect-metadata";

import { Container } from 'inversify';

import {
  IFindUserAction,
  IRegisterUserAction
} from 'src/types/actions';

import FindUserAction from 'src/actions/user/find';
import RegisterUserAction from 'src/actions/user/register';

import Types from 'src/actions/user/types';

export const bind = (container: Container) => {
  container.bind<IFindUserAction>(Types.FindUserAction).to(FindUserAction).inRequestScope();
  container.bind<IRegisterUserAction>(Types.RegisterUserAction).to(RegisterUserAction).inRequestScope();
}
