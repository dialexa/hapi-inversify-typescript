import * as _ from 'lodash';

export default class InvalidPasswordError implements Error {
  public readonly name: string = 'InvalidPasswordError';

  public get message(): string {
    return `The provided password is incorrect.`
  }
}
