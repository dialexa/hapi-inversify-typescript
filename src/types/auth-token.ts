import { IAction } from './actions'
import { IUser } from './user';

export interface IAuthToken {
  id: string;

  userId: string;
  token: string;

  createdAt: Date;
  expiresAt: Date;
}

export interface ICreateAuthTokenAction extends IAction<IUser, IAuthToken> { }
export interface IDestroyAuthTokenAction extends IAction<IAuthToken, boolean> { }
export interface IRefreshAuthTokenAction extends IAction<IAuthToken, void> { }
