import "reflect-metadata";

import { IRepository } from '@dialexa/knex-plus';
import * as addSeconds from 'date-fns/add_seconds';
import { inject, injectable } from "inversify";

import { SystemConfig } from 'src/config';

import { ICreateAuthTokenAction } from 'src/types/actions';
import { IAuthToken } from 'src/types/auth-token';
import { IKairos} from 'src/types/core';
import { IUser } from 'src/types/user';

import { default as CoreTypes } from 'src/core/types';
import Types from 'src/repositories/types';

@injectable()
export default class CreateAuthTokenAction implements ICreateAuthTokenAction {
  @inject(CoreTypes.Kairos)
  private readonly kairos: IKairos;

  @inject(Types.AuthTokenRepository)
  private readonly authTokenRepository: IRepository<IAuthToken>;

  public async execute (user: IUser): Promise<IAuthToken> {
    // Generate a token
    const token = this.kairos.generateToken();
    // Calculate the expiration date
    const ttl = SystemConfig.SESSION_TTL;
    const expiresAt = addSeconds(new Date(), ttl);
    // Persist the authentication token
    return await this.authTokenRepository.create({ userId: user.id, token, expiresAt });
  }
}
