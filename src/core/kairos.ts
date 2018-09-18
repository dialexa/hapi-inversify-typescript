import * as crypto from 'crypto';
import { injectable } from 'inversify';

export interface IKairosOptions {
  iterations: number;
  keylen: number;
  digest: string;
}

const DEFAULT_OPTIONS: IKairosOptions = {
  iterations: parseInt(process.env.PASSWORD_HASH_ITERATIONS, 10) || 1,
  keylen: 32,
  digest: 'sha512'
}

@injectable()
export default class Kairos {
  constructor (private options: IKairosOptions = DEFAULT_OPTIONS) { }

  public async encrypt(password: string) : Promise<{ salt: Buffer, secret: Buffer }> {
    const salt = crypto.randomBytes(64);

    const secret = await this.pbkdf2(password, salt);

    return { salt, secret };
  }

  public async verify(password: string, expected: { salt: Buffer, secret: Buffer }) : Promise<boolean> {
    const { salt, secret } = expected;

    const hash = await this.pbkdf2(password, salt);

    return Buffer.compare(secret, hash) === 0;
  }

  public generateToken(length: number = 64): string {
    return crypto.randomBytes(length).toString('base64');
  }

  private pbkdf2 (password: string, salt: Buffer) : Promise<Buffer> {
    const { iterations, keylen, digest } = this.options;

    return new Promise<Buffer>((resolve, reject) => {
      return crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, secret) => {
        if (err) { reject(err); }
        else { resolve(secret); }
      });
    })
  }
}
