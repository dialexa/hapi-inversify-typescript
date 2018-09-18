import "reflect-metadata";

import { IRepository } from '@dialexa/knex-plus';
import { inject, injectable } from "inversify";

import { NotFoundError } from 'src/errors';

import { IConfirmUserAction, ICreateAuthTokenAction, IFindUserAction } from 'src/types/actions';

import { IAuthToken } from 'src/types/auth';
import { IUser } from 'src/types/user';

import AuthTokenTypes from 'src/actions/auth-token/types';
import UserTypes from 'src/actions/user/types';
import RepositoryTypes from 'src/repositories/types';

@injectable()
export default class ConfirmUserAction implements IConfirmUserAction {
  @inject(RepositoryTypes.UserRepository)
  private readonly userRepository: IRepository<IUser>;

  @inject(UserTypes.FindUserAction)
  private readonly findUserAction: IFindUserAction;

  @inject(AuthTokenTypes.CreateAuthTokenAction)
  private readonly createAuthTokenAction: ICreateAuthTokenAction;

  public async execute (confirmationToken: string): Promise<IAuthToken> {
    // Fetch the user associated with the confirmation token
    const user = await this.findUserAction.execute({ confirmationToken });
    // Make the user exists
    if (!user) { throw new NotFoundError('confirmationToken'); }
    // Confirm & return the user
    const changes = { confirmedAt: new Date(), confirmationToken: null, confirmationSentAt: null };
    await this.userRepository.update({ id: user.id }, changes);
    // Create an authentication token
    return await this.createAuthTokenAction.execute(user);
  }
}
