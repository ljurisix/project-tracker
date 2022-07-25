import { Dispatch } from 'redux';
import { notification } from 'antd';
import { AuthConstants } from './auth.constants';

import { UserService } from '../../api/api.service';
import { LoginInterface, LoginResponseInterface } from '../../interfaces';
import { i18n, NavigationService } from '../../services';
import { AppRoutes } from '../../../features/app';
import { AuthRoutes } from '../../../features/auth';

export function loginAction(data: LoginInterface) {
  return (dispatch: Dispatch) => {
    return UserService.login(data).subscribe(
      (response: LoginResponseInterface) => {
        if (response.success === false) {
          dispatch({
            type: AuthConstants.ERROR,
            payload: response.errorCode,
          });
          notification['error']({
            message: 'Incorrect login information!',
            duration: 5,
          });
          return;
        }
        dispatch({
          type: AuthConstants.LOGIN_SUCCESS,
          payload: response,
        });
        notification['success']({
          message: 'Successful login :)',
          duration: 3,
        });
        NavigationService.navigate(AppRoutes.PROJECTS.fullPath);
      },
      (error: Error) => {
        dispatch({
          type: AuthConstants.ERROR,
          payload: error,
        });
        notification['error']({
          message: 'Incorrect login information!',
          duration: 5,
        });
        console.log(error);
      }
    );
  };
}

export function logoutAction() {
  return (dispatch: Dispatch) => {
    dispatch({ type: AuthConstants.LOGOUT_SUCCESS });
    notification['success']({ message: i18n.translate('login.msgs.logout'), duration: 2 });
    NavigationService.navigate(AuthRoutes.LOGIN.fullPath);
  };
}

export function setLangAction(lang: 'hr' | 'en') {
  return (dispatch: Dispatch) => {
    dispatch({ type: AuthConstants.SET_LANG, payload: lang });
  };
}
