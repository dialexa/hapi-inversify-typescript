import { IAction } from './actions';
import { IAuthToken } from './auth-token';
import { IUser } from './user';

export interface ICreateSessionParams {
  email?: string;
  username?: string;
  password: string;
}

export interface ICreateSessionAction extends IAction<ICreateSessionParams, IAuthToken> { }

export interface IAuthenticateAction extends IAction<IAuthToken, IUser> { }
