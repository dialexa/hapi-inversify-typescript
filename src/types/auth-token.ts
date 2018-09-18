export interface IAuthToken {
  id: string;

  userId: string;
  token: string;

  createdAt: Date;
  expiresAt: Date;
}
