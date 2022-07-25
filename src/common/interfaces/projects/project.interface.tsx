import { BaseResponseInterface } from '../base/base.interface';
import { CollaboratorInterface, UserInterface } from '../user/user.interface';

export interface ProjectInterface {
  id: string;
  name: string;
  description: string;
  conceptual_design?: boolean;
  technical_design?: boolean;
  date?: Date;
  creator: UserInterface;
  collaborators: CollaboratorInterface[];
}

export interface ProjectsResponseInterface extends BaseResponseInterface {
  data: Array<ProjectInterface>;
  error: Array<any>;
}
