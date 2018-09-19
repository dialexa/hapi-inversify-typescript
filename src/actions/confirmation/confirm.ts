import "reflect-metadata";

import { inject, injectable } from "inversify";

import { NotFoundError } from 'src/errors';

import { ICreateAuthTokenAction } from 'src/types/auth-token';
import { IConfirmUserAction } from 'src/types/confirmation';

import { IAuthToken } from 'src/types/auth-token';
import { IFindUserAction, IUpdateUserAction } from 'src/types/user';

import AuthTokenTypes from 'src/actions/auth-token/types';
import UserTypes from 'src/actions/user/types';

@injectable()
export default class ConfirmUserAction implements IConfirmUserAction {

  @inject(UserTypes.FindUserAction)
  private readonly findUserAction: IFindUserAction;

  @inject(UserTypes.UpdateUserAction)
  private readonly updateUserAction: IUpdateUserAction;

  @inject(AuthTokenTypes.CreateAuthTokenAction)
  private readonly createAuthTokenAction: ICreateAuthTokenAction;

  public async execute (confirmationToken: string): Promise<IAuthToken> {
    // Fetch the user associated with the confirmation token
    const user = await this.findUserAction.execute({ confirmationToken });
    // Make the user exists
    if (!user) { throw new NotFoundError('confirmationToken'); }
    // Confirm & return the user
    const criteria = { id: user.id }
    const changes = { confirmedAt: new Date(), confirmationToken: null, confirmationSentAt: null };
    await this.updateUserAction.execute({ criteria, changes });
    // Create an authentication token
    return await this.createAuthTokenAction.execute(user);
  }
}
