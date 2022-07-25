import { UserInterface } from '../user/user.interface';

export interface LoginInterface {
  emailOrNickname: string;
  password: string;
}

export interface LoginResponseInterface {
  accessToken: string;
  user: UserInterface;
}
