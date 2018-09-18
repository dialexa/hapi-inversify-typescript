export interface IKairos {
  encrypt(password: string) : Promise<{ salt: Buffer, secret: Buffer }>
  verify(password: string, expected: { salt: Buffer, secret: Buffer }) : Promise<boolean>

  generateToken(length?: number): string
}
