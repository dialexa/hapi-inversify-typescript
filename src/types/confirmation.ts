import { IAction } from './actions';
import { IAuthToken } from './auth-token';

export interface IConfirmUserAction extends IAction<string, IAuthToken> { }
