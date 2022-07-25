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
        dispatch({
          type: AuthConstants.LOGIN_SUCCESS,
          payload: response,
        });

        notification['success']({ message: i18n.translate('login.msgs.login'), duration: 2 });

        NavigationService.navigate(AppRoutes.DASHBOARD.fullPath);
      },
      (error: Error) => {
        dispatch({
          type: AuthConstants.ERROR,
          payload: error,
        });
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
