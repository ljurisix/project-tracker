import { Dispatch } from 'redux';
import { UserService } from '../../api';
import { LoginInterface, RegisterInterface, RegisterResponseInterface, UserInterface, UsersResponseInterface } from '../../interfaces';
import { AuthConstants, loginAction } from '../auth';
import { notification } from 'antd';
import { UserConstants } from './users.constants';
import { i18n } from '../../services';

export function registerAction(data: RegisterInterface) {
  return (dispatch: Dispatch) => {
    return UserService.register(data).subscribe(
      (response: RegisterResponseInterface) => {
        dispatch({
          type: UserConstants.REGISTER_SUCCESS,
          payload: response,
        });
        notification['success']({
          message: i18n.translate(`login.msgs.registered`),
          duration: 3,
        });
        let loginData: LoginInterface = {
          email: data.email,
          password: data.password,
        };
        dispatch(loginAction(loginData) as any);
      },
      (error: Error) => {
        dispatch({
          type: AuthConstants.ERROR,
          payload: error,
        });
        console.log(error);
      }
    );
  };
}

export function getAllUsers() {
  return (dispatch: Dispatch) => {
    return UserService.getUsers().subscribe(
      (response: UsersResponseInterface) => {
        dispatch({
          type: UserConstants.GET_USERS,
          payload: response.data,
        });
      },
      (error: Error) => {
        dispatch({
          type: UserConstants.ERROR,
          payload: error,
        });
        console.log(error);
      }
    );
  };
}
