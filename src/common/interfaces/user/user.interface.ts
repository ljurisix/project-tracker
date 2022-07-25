import { UserRoleEnum } from '../../enums';

export interface UserInterface {
  id?: number;
  email: string;
  username: string;
  name: string;
  age: number;
  role: UserRoleEnum;
}
