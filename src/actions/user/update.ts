import "reflect-metadata";

import { IRepository } from '@dialexa/knex-plus';
import { inject, injectable } from "inversify";
import * as _ from 'lodash';

import { IKairos} from 'src/types/core';
import { IUpdateUserAction, IUpdateUserParams, IUser } from 'src/types/user';

import CoreTypes from 'src/core/types';
import RepositoryTypes from 'src/repositories/types';

@injectable()
export default class UpdateUserAction implements IUpdateUserAction {
  @inject(CoreTypes.Kairos)
  private readonly kairos: IKairos;

  @inject(RepositoryTypes.UserRepository)
  private readonly userRepository: IRepository<IUser>;

  public async execute (params: IUpdateUserParams): Promise<boolean> {
    const { criteria, changes } = params;

    const identifiers = _.pickBy(criteria, _.identity);
    const { password, ...updates } = changes;

    if (password) {
      // Encrypt the new password
      const { salt, secret } = await this.kairos.encrypt(password);
      Object.assign(updates, { salt, secret });
    }

    return await this.userRepository.update(identifiers, updates);
  }
}
