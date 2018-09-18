import { Container, decorate, injectable } from 'inversify';
import "reflect-metadata";

import { AuditableRepository, IRepository, Repository } from '@dialexa/knex-plus';

import AuthTokenRepository from 'src/repositories/auth-token';
import UserRepository from 'src/repositories/user';

import { IAuthToken } from 'src/types/auth-token';
import { IUser } from 'src/types/user';

import Types from 'src/repositories/types';

decorate(injectable(), Repository);
decorate(injectable(), AuditableRepository);

export const bind = (container: Container) => {
  container.bind<IRepository<IAuthToken>>(Types.AuthTokenRepository).to(AuthTokenRepository).inRequestScope();
  container.bind<IRepository<IUser>>(Types.UserRepository).to(UserRepository).inRequestScope();
}
