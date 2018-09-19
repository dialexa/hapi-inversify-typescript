import { IAction } from './actions';

export interface IRegisterUserParams {
  email: string;
  username: string;
  password: string;
}

export interface IRegisterUserAction extends IAction<IRegisterUserParams, void> { }
