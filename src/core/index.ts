import "reflect-metadata";

import { Container } from 'inversify';
import * as Knex from 'knex';

import { IKairos } from 'src/types/core';

import kairos from 'src/core/kairos';
import knex from 'src/core/knex';

import Types from 'src/core/types';

export const bind = (container: Container) => {
  container.bind<IKairos>(Types.Kairos).to(kairos).inRequestScope();
  container.bind<Knex>(Types.Knex).toConstantValue(knex);
}
