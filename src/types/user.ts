export interface IUser {
  id: string;

  username: string;
  email: string;

  salt?: Buffer;
  secret?: Buffer;

  confirmationToken?: string;
  confirmationSentAt?: Date;
  confirmedAt?: Date;

  createdAt: Date;
  updatedAt?: Date;
}
