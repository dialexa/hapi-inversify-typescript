import { inject, injectable } from 'inversify';
import "reflect-metadata";

import { AuditableRepository } from '@dialexa/knex-plus';
import * as Knex from 'knex';

import Types from 'src/core/types';
import { IUser } from 'src/types/user';

@injectable()
export default class UserRepository extends AuditableRepository<IUser> {
  constructor (@inject(Types.Knex) knex: Knex) {
    super(knex, 'users');
  }
}
