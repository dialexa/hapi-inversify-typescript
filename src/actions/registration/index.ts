import "reflect-metadata";

import { Container } from 'inversify';

import { IRegisterUserAction } from 'src/types/actions';

import RegisterUserAction from './register';
import Types from './types';

export const bind = (container: Container) => {
  container.bind<IRegisterUserAction>(Types.RegisterUserAction).to(RegisterUserAction).inRequestScope();
}
