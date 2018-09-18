import "reflect-metadata";

import { IRepository } from '@dialexa/knex-plus';
import { inject, injectable } from "inversify";

import { AlreadyExistsError } from 'src/errors';

import { IRegisterUserAction } from 'src/types/actions';
import { IKairos} from 'src/types/core';
import { IUser } from 'src/types/user';

import CoreTypes from 'src/core/types';
import RepositoryTypes from 'src/repositories/types';

@injectable()
export default class RegisterUserAction implements IRegisterUserAction {
  @inject(CoreTypes.Kairos)
  private readonly kairos: IKairos;

  @inject(RepositoryTypes.UserRepository)
  private readonly userRepository: IRepository<IUser>;

  public async execute (params: { email: string, username: string, password: string }): Promise<void> {
    const { email, username, password } = params;
    // Make sure the email isn't taken
    let user = await this.userRepository.findBy({ email });
    if (user) { throw new AlreadyExistsError('email'); }
    // Make sure the username isn't taken
    user = await this.userRepository.findBy({ username });
    if (user) { throw new AlreadyExistsError('username') }
    // Encrypt the password
    const { salt, secret } = await this.kairos.encrypt(password);
    // Create the confirmation data
    const confirmationToken = this.kairos.generateToken();
    const confirmationSentAt = new Date();
    // Persist the user
    await this.userRepository.create({ email, username, salt, secret, confirmationToken, confirmationSentAt });
  }
}
