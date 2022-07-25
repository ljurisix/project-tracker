import { ProjectInterface, ProjectsResponseInterface } from '../interfaces';
import { apiRoutes } from './routes';

import { Observable } from 'rxjs';
import HttpFactory from './abstract.api.service';

export class ProjectService {
  static getProjects(): Observable<ProjectsResponseInterface> {
    return HttpFactory.GET(apiRoutes.projects);
  }

  static createProject(data: ProjectInterface): Observable<ProjectInterface> {
    return HttpFactory.POST(apiRoutes.projects, data);
  }

  static editProject(data: ProjectInterface): Observable<ProjectInterface> {
    return HttpFactory.POST(apiRoutes.projects, data);
  }

  static deleteProject(id: number): Observable<ProjectInterface> {
    return HttpFactory.DELETE([apiRoutes.projects, id].join('/'));
  }
}
