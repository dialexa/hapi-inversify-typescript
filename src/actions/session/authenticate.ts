import "reflect-metadata";

import { inject, injectable } from "inversify";
import * as _ from 'lodash';

import {
  IAuthenticateAction,
  IFindUserAction,
  IRefreshAuthTokenAction
} from 'src/types/actions';

import { IAuthToken } from 'src/types/auth';
import { IUser } from 'src/types/user';

import AuthTokenTypes from 'src/actions/auth-token/types';
import UserTypes from 'src/actions/user/types';

@injectable()
export default class AuthenticateAction implements IAuthenticateAction {
  @inject(AuthTokenTypes.RefreshAuthTokenAction)
  private readonly refreshAuthTokenAction: IRefreshAuthTokenAction;

  @inject(UserTypes.FindUserAction)
  private readonly findUserAction: IFindUserAction;

  public async execute (token: IAuthToken): Promise<IUser> {
    // Refresh the token
    await this.refreshAuthTokenAction.execute(token);
    // Fetch the user associated with the token
    return await this.findUserAction.execute({ id: token.userId });
  }
}
