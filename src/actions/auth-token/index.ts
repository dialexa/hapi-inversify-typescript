import "reflect-metadata";

import { Container } from 'inversify';

import {
  ICreateAuthTokenAction,
  IDestroyAuthTokenAction,
  IRefreshAuthTokenAction
} from 'src/types/auth-token';

import CreateAuthTokenAction from './create';
import DestroyAuthTokenAction from './destroy';
import RefreshAuthTokenAction from './refresh';

import Types from './types';

export const bind = (container: Container) => {
  container.bind<ICreateAuthTokenAction>(Types.CreateAuthTokenAction).to(CreateAuthTokenAction).inRequestScope();
  container.bind<IDestroyAuthTokenAction>(Types.DestroyAuthTokenAction).to(DestroyAuthTokenAction).inRequestScope();
  container.bind<IRefreshAuthTokenAction>(Types.RefreshAuthTokenAction).to(RefreshAuthTokenAction).inRequestScope();
}
