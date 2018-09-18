import "reflect-metadata";

import { Container } from 'inversify';

import { IConfirmUserAction } from 'src/types/actions';

import ConfirmUserAction from './confirm';
import Types from './types';

export const bind = (container: Container) => {
  container.bind<IConfirmUserAction>(Types.ConfirmUserAction).to(ConfirmUserAction).inRequestScope();
}
