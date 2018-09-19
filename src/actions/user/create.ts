import "reflect-metadata";

import { IRepository } from '@dialexa/knex-plus';
import { inject, injectable } from "inversify";

import { IKairos} from 'src/types/core';
import { ICreateUserAction, ICreateUserParams, IUser } from 'src/types/user';

import CoreTypes from 'src/core/types';
import RepositoryTypes from 'src/repositories/types';

@injectable()
export default class CreateUserAction implements ICreateUserAction {
  @inject(CoreTypes.Kairos)
  private readonly kairos: IKairos;

  @inject(RepositoryTypes.UserRepository)
  private readonly userRepository: IRepository<IUser>;

  public async execute (params: ICreateUserParams): Promise<IUser> {
    const { email, username, password } = params;
    // Encrypt the password
    const { salt, secret } = await this.kairos.encrypt(password);
    // Create the confirmation data
    const confirmationToken = this.kairos.generateToken();
    const confirmationSentAt = new Date();
    // Persist the user
    return await this.userRepository.create({ email, username, salt, secret, confirmationToken, confirmationSentAt });
  }
}
