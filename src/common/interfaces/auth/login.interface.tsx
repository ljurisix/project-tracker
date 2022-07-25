import { BaseResponseInterface } from '../base/base.interface';
import { UserInterface } from '../user/user.interface';

export interface LoginInterface {
  email: string;
  password: string;
}

export interface LoginResponseInterface extends BaseResponseInterface {
  data: {
      accessToken: string;
      user: UserInterface;
  }
}