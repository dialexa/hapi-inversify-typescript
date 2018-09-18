import "reflect-metadata";

import { Container } from 'inversify';

import {
  ICreateUserAction,
  IFindUserAction
} from 'src/types/actions';

import CreateUserAction from './create';
import FindUserAction from './find';
import Types from './types';

export const bind = (container: Container) => {
  container.bind<ICreateUserAction>(Types.CreateUserAction).to(CreateUserAction).inRequestScope();
  container.bind<IFindUserAction>(Types.FindUserAction).to(FindUserAction).inRequestScope();
}
