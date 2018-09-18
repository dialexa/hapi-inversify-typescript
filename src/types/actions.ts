import { IAuthToken } from 'src/types/auth-token';
import { IUser } from 'src/types/user';

interface IAction<S, T> {
  execute(s: S): Promise<T>
}

export interface ICreateUserAction extends IAction<{email: string, username: string, password: string}, IUser> { }
export interface IFindUserAction extends IAction<{id?: string, email?: string, username?: string, confirmationToken?: string }, IUser> { }

export interface IConfirmUserAction extends IAction<string, IAuthToken> { }
export interface IRegisterUserAction extends IAction<{email: string, username: string, password: string}, void> { }

export interface ICreateSessionAction extends IAction<{email?: string, username?: string, password: string}, IAuthToken> { }
export interface IAuthenticateAction extends IAction<IAuthToken, IUser> { }

export interface ICreateAuthTokenAction extends IAction<IUser, IAuthToken> { }
export interface IDestroyAuthTokenAction extends IAction<IAuthToken, void> { }
export interface IRefreshAuthTokenAction extends IAction<IAuthToken, void> { }
