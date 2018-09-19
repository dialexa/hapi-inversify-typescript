import "reflect-metadata";

import { inject, injectable } from "inversify";
import * as _ from 'lodash';

import { InvalidPasswordError, NotConfirmedError, NotFoundError } from 'src/errors';

import { ICreateSessionAction } from 'src/types/auth';
import { ICreateAuthTokenAction } from 'src/types/auth-token';
import { IFindUserAction } from 'src/types/user';

import { IAuthToken } from 'src/types/auth-token';
import { IKairos} from 'src/types/core';

import AuthTokenTypes from 'src/actions/auth-token/types';
import UserTypes from 'src/actions/user/types';
import CoreTypes from 'src/core/types';

@injectable()
export default class CreateSessionAction implements ICreateSessionAction {
  @inject(CoreTypes.Kairos)
  private readonly kairos: IKairos;

  @inject(UserTypes.FindUserAction)
  private readonly findUserAction: IFindUserAction;

  @inject(AuthTokenTypes.CreateAuthTokenAction)
  private readonly createAuthTokenAction: ICreateAuthTokenAction;

  public async execute (params: { email?: string, username?: string, password: string}): Promise<IAuthToken> {
    // Fetch the user
    const { email, username, password } = params;
    const user = await this.findUserAction.execute({ email, username });
    // Does the user exist?
    if (!user) { throw new NotFoundError('user'); }
    // Make sure the user is confirmed
    if (!user.confirmedAt) { throw new NotConfirmedError(); }
    // Make sure the password is correct
    const { salt, secret } = user;
    const isValid = await this.kairos.verify(password, { salt, secret });
    if (!isValid) { throw new InvalidPasswordError(); }
    // Generate a token
    return await this.createAuthTokenAction.execute(user);
  }
}
