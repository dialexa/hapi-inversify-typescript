import * as _ from 'lodash';

export default class AlreadyExistsError implements Error {
  public readonly name: string = 'AlreadyExistsError';

  constructor (private attribute: string) { }

  public get message(): string {
    return `The provided "${_.startCase(this.attribute)}" already exists.`
  }
}
