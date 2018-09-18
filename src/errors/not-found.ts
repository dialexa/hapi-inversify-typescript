import * as _ from 'lodash';

export default class NotFoundError implements Error {
  public readonly name: string = 'NotFoundError';

  constructor (private attribute: string) { }

  public get message(): string {
    return `The provided "${_.startCase(this.attribute)}" does not exist.`
  }
}
