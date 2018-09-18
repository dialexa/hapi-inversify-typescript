import * as _ from 'lodash';

export default class NotConfirmedError implements Error {
  public readonly name: string = 'NotConfirmedError';

  public get message(): string {
    return `This user has not been confirmed.`
  }
}
