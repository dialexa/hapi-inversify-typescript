import "reflect-metadata";

import { inject, injectable } from "inversify";

import { AlreadyExistsError } from 'src/errors';
import { ICreateUserAction, IFindUserAction, IRegisterUserAction } from 'src/types/actions';

import UserTypes from 'src/actions/user/types';

@injectable()
export default class RegisterUserAction implements IRegisterUserAction {
  @inject(UserTypes.FindUserAction)
  private readonly findUserAction: IFindUserAction;

  @inject(UserTypes.CreateUserAction)
  private readonly createUserAction: ICreateUserAction;

  public async execute (params: { email: string, username: string, password: string }): Promise<void> {
    const { email, username, password } = params;
    // Make sure the email isn't taken
    let user = await this.findUserAction.execute({ email });
    if (user) { throw new AlreadyExistsError('email'); }
    // Make sure the username isn't taken
    user = await this.findUserAction.execute({ username });
    if (user) { throw new AlreadyExistsError('username') }
    // Create the user
    await this.createUserAction.execute({ email, username, password });
  }
}
