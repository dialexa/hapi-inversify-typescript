import "reflect-metadata";

import { IRepository } from '@dialexa/knex-plus';
import * as addSeconds from 'date-fns/add_seconds';
import { inject, injectable } from "inversify";
import * as _ from 'lodash';

import { SystemConfig } from 'src/config';
import { NotFoundError } from 'src/errors';

import { IRefreshAuthTokenAction } from 'src/types/actions';
import { IAuthToken } from 'src/types/auth-token';

import RepositoryTypes from 'src/repositories/types';

@injectable()
export default class RefreshAuthTokenAction implements IRefreshAuthTokenAction {
  @inject(RepositoryTypes.AuthTokenRepository)
  private readonly authTokenRepository: IRepository<IAuthToken>;

  public async execute (token: IAuthToken): Promise<void> {
    const expiresAt = addSeconds(new Date(), SystemConfig.SESSION_TTL);
    const isRefreshed = await this.authTokenRepository.update({ id: token.id }, { expiresAt });
    // Make sure we refreshed the token!
    if (!isRefreshed) { throw new NotFoundError('authentication token'); }
  }
}
