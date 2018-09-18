import { Container } from 'inversify';
import { IAuthToken } from 'src/types/auth';

declare module 'hapi' {
  export interface Request {
    container(): Container,
    cookieAuth: {
      set(session: IAuthToken): void,
      clear(): void
    }
  }
}
