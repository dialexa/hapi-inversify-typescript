import "reflect-metadata";

import { IRepository } from '@dialexa/knex-plus';
import { inject, injectable } from "inversify";
import * as _ from 'lodash';

import { IFindUserAction, IFindUserParams, IUser } from 'src/types/user';

import RepositoryTypes from 'src/repositories/types';

@injectable()
export default class FindUserAction implements IFindUserAction {
  @inject(RepositoryTypes.UserRepository)
  private readonly userRepository: IRepository<IUser>;

  public async execute (params: IFindUserParams): Promise<IUser> {
    const identifiers = _.pickBy(params, _.identity);
    return await this.userRepository.findBy(identifiers);
  }
}
