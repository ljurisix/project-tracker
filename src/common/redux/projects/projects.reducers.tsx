import { ProjectInterface, ReducerActionInterface } from '../../interfaces';
import { ProjectConstants } from './projects.constants';

export interface ProjectStateInterface {
  projects: ProjectInterface[];
}

const initialState: ProjectStateInterface = {
  projects: [],
};

const newProject = (state: ProjectStateInterface, payload: ProjectInterface): ProjectStateInterface => {
  return {
    ...state,
    projects: [...state.projects, payload],
  };
};

const getProjects = (state: ProjectStateInterface, payload: Array<ProjectInterface>): ProjectStateInterface => {
  return {
    ...state,
    projects: payload,
  };
};

const editProject = (state: ProjectStateInterface, payload: ProjectInterface): ProjectStateInterface => {
  return {
    ...state,
  };
};

const deleteProject = (state: ProjectStateInterface, payload: string): ProjectStateInterface => {
  return {
    ...state,
    projects: state.projects.filter((p) => p.id !== payload),
  };
};

const error = (state: ProjectStateInterface, payload: string) => {
  return {
    ...state,
  };
};

export const ProjectReducer = (state = initialState, action: ReducerActionInterface) => {
  switch (action.type) {
    case ProjectConstants.GET_PROJECTS:
      return getProjects(state, action.payload);
    case ProjectConstants.NEW_PROJECT:
      return newProject(state, action.payload);
    case ProjectConstants.UPDATE_PROJECT:
      return editProject(state, action.payload);
    case ProjectConstants.DELETE_PROJECT:
      return deleteProject(state, action.payload);
    case ProjectConstants.ERROR:
      return error(state, action.payload);
    default:
      return state;
  }
};
