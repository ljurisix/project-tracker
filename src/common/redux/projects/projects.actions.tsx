import { Dispatch } from 'redux';
import { ProjectService } from '../../api/projects.service';
import { ProjectInterface, ProjectsResponseInterface } from '../../interfaces';
import { ProjectConstants } from './projects.constants';

export function getAllProjects() {
  return (dispatch: Dispatch) => {
    return ProjectService.getProjects().subscribe(
      (response: ProjectsResponseInterface) => {
        dispatch({
          type: ProjectConstants.GET_PROJECTS,
          payload: response.data,
        });
      },
      (error: Error) => {
        dispatch({
          type: ProjectConstants.ERROR,
          payload: error,
        });
        console.log(error);
      }
    );
  };
}

export function newProject(data: ProjectInterface) {
  return (dispatch: Dispatch) => {
    return ProjectService.createProject(data).subscribe(
      (response: ProjectInterface) => {
        dispatch({
          type: ProjectConstants.NEW_PROJECT,
          payload: response,
        });
      },
      (error: Error) => {
        dispatch({
          type: ProjectConstants.ERROR,
          payload: error,
        });
        console.log(error);
      }
    );
  };
}

export function editProject(data: ProjectInterface) {
  return (dispatch: Dispatch) => {
    return ProjectService.editProject(data).subscribe(
      (response: ProjectInterface) => {
        dispatch({
          type: ProjectConstants.UPDATE_PROJECT,
          payload: response,
        });
      },
      (error: Error) => {
        dispatch({
          type: ProjectConstants.ERROR,
          payload: error,
        });
        console.log(error);
      }
    );
  };
}

export function deleteProject(id: string) {
  return (dispatch: Dispatch) => {
    return ProjectService.deleteProject(+id).subscribe(
      (response: ProjectInterface) => {
        dispatch({
          type: ProjectConstants.DELETE_PROJECT,
          payload: response,
        });
      },
      (error: Error) => {
        dispatch({
          type: ProjectConstants.ERROR,
          payload: error,
        });
        console.log(error);
      }
    );
  };
}
