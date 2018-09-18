import { inject, injectable } from "inversify";
import "reflect-metadata";

import { Repository } from '@dialexa/knex-plus';
import * as Knex from 'knex';

import Types from 'src/core/types';
import { IAuthToken } from 'src/types/auth';


@injectable()
export default class AuthTokenRepository extends Repository<IAuthToken> {
  constructor (@inject(Types.Knex) knex: Knex) {
    super(knex, 'auth_tokens');
  }
}
