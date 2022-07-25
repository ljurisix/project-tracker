import { ReducerActionInterface, UserInterface } from '../../interfaces';
import { nanoid } from 'nanoid';
import { UserConstants } from './users.constants';

export interface UserStateInterface {
  users: UserInterface[];
}

const initialState: UserStateInterface = {
  users: [],
};

const registerSuccess = (state: UserStateInterface, payload: UserInterface) => {
  let newUser: UserInterface = {
    id: nanoid(),
    email: payload.email,
    password: payload.password,
  };
  return {
    ...state,
    users: [...state.users, newUser],
  };
};

const error = (state: UserStateInterface, payload: string) => {
  return {
    ...state,
    error: payload,
  };
};

export const UsersReducer = (state = initialState, action: ReducerActionInterface) => {
  switch (action.type) {
    case UserConstants.REGISTER_SUCCESS:
      return registerSuccess(state, action.payload);
    case UserConstants.ERROR:
      return error(state, action.payload);
    default:
      return state;
  }
};
