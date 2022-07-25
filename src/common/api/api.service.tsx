import HttpFactory from './abstract.api.service';
import { apiRoutes } from './routes';
import { Observable } from 'rxjs';
import { LoginInterface, LoginResponseInterface } from '../interfaces';

export class UserService {
  static login(data: LoginInterface): Observable<LoginResponseInterface> {
    // return HttpFactory.POST(apiRoutes.login, data);
    // Use GET because we are using MOCK API
    return HttpFactory.GET(apiRoutes.login);
  }
}
