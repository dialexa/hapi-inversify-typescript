import "reflect-metadata";

import { Container } from 'inversify';

import * as Actions from 'src/actions';
import * as Core from 'src/core';
import * as Repositories from 'src/repositories';

// create the container
const container = new Container({ skipBaseClassChecks: true });

// bind core
Core.bind(container);
// bind repositories
Repositories.bind(container);
// bind actions
Actions.bind(container);

export default container;
