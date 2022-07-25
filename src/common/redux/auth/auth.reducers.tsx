import { AuthConstants } from './auth.constants';
import { LoginResponseInterface, ReducerActionInterface, UserInterface } from '../../interfaces';

// ============ INTERFACE ============

export interface AuthStateInterface {
  lang: 'hr' | 'en';
  isAuthenticated: boolean;
  accessToken?: string;
  user?: UserInterface;
  error?: string;
}

// ============ INIT STATE ============

const initialState: AuthStateInterface = {
  lang: 'hr',
  isAuthenticated: false,
  user: undefined
};

// ============ REDUCERS ============

const loginSuccess = (state: AuthStateInterface, payload: LoginResponseInterface): AuthStateInterface => {
  return {
    ...state,
    isAuthenticated: true,
    accessToken: payload.data.accessToken,
    user: payload.data.user,
  };
};

const logoutSuccess = (state: AuthStateInterface, payload: LoginResponseInterface): AuthStateInterface => {
  return {
    ...state,
    isAuthenticated: false,
    accessToken: undefined,
    user: undefined,
  };
};

const registerSuccess = (state: AuthStateInterface) => {
  return {
    ...state,
  };
};

const error = (state: AuthStateInterface, payload: string) => {
  return {
    ...state,
    error: payload,
  };
};

const setLang = (state: AuthStateInterface, payload: 'hr' | 'en'): AuthStateInterface => {
  return {
    ...state,
    lang: payload,
  };
};

// ============ EXPORTS ============

export const AuthReducer = (state = initialState, action: ReducerActionInterface) => {
  switch (action.type) {
    case AuthConstants.LOGIN_SUCCESS:
      return loginSuccess(state, action.payload);
    case AuthConstants.LOGOUT_SUCCESS:
      return logoutSuccess(state, action.payload);
    case AuthConstants.ERROR:
      return error(state, action.payload);
    case AuthConstants.SET_LANG:
      return setLang(state, action.payload);
    default:
      return state;
  }
};
