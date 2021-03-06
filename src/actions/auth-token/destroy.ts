import "reflect-metadata";

import { IRepository } from '@dialexa/knex-plus';
import { inject, injectable } from "inversify";
import * as _ from 'lodash';

import { IDestroyAuthTokenAction } from 'src/types/auth-token';

import { IAuthToken } from 'src/types/auth-token';

import RepositoryTypes from 'src/repositories/types';

@injectable()
export default class DestroyAction implements IDestroyAuthTokenAction {
  @inject(RepositoryTypes.AuthTokenRepository)
  private readonly authTokenRepository: IRepository<IAuthToken>;

  public async execute (token: IAuthToken): Promise<boolean> {
    // Remove the token from the database
    return await this.authTokenRepository.destroy({ id: token.id });
  }
}
