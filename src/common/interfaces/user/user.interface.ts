import { BaseResponseInterface } from '../';
import { UserRoleEnum } from '../../enums';

export interface UserInterface {
  id?: string;
  email: string;
  password: string;
}

export interface CollaboratorInterface {
  user_id: number;
  user: UserInterface;
}

export interface UsersResponseInterface extends BaseResponseInterface {
  data: Array<UserInterface>;
  error: Array<any>;
}
