import HttpFactory from './abstract.api.service';
import { apiRoutes } from './routes';
import { Observable } from 'rxjs';
import { LoginInterface, LoginResponseInterface, RegisterInterface, RegisterResponseInterface, UserInterface, UsersResponseInterface } from '../interfaces';

export class UserService {
  static login(data: LoginInterface): Observable<LoginResponseInterface> {
    return HttpFactory.POST(apiRoutes.login, data);
  }

  static register(data: RegisterInterface): Observable<RegisterResponseInterface> {
    return HttpFactory.POST(apiRoutes.register, data);
  }

  static getUsers(): Observable<UsersResponseInterface> {
    return HttpFactory.GET(apiRoutes.users);
  }
}
