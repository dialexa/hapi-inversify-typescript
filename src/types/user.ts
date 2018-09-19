import { IAction } from './actions'

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

export interface ICreateUserParams {
  email: string;
  username: string;
  password: string
}

export interface ICreateUserAction extends IAction<ICreateUserParams, IUser> { }

export interface IFindUserParams {
  id?: string;
  email?: string;
  username?: string;
  confirmationToken?: string;
}

export interface IFindUserAction extends IAction<IFindUserParams, IUser> { }

export interface IUpdateUserChangeset {
  username?: string;
  email?: string;
  password?: string;

  confirmationToken?: string;
  confirmationSentAt?: Date;
  confirmedAt?: Date;
}

export interface IUpdateUserParams {
  criteria: IFindUserParams,
  changes: IUpdateUserChangeset
}

export interface IUpdateUserAction extends IAction<IUpdateUserParams, boolean> { }
