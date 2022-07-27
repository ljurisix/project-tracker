import React from "react"
import { NavigationService, ProjectInterface } from "../../../common/index"
import { AppRoutes } from "../_router/app.routes";

interface Props {
    project: ProjectInterface
}

function goToDetails(id: string){
    NavigationService.navigate(AppRoutes.PROJECTS.path + `/${id}`);
}

function ProjectCardComponent({project}: Props) {
    return (
      <div key={project.id} className="item" onClick={() => goToDetails(project.id)}>
        <div className="name">
            <h3>{project.name}</h3>
            <i className="fa-solid fa-angle-right"></i>
        </div>
      </div>  
    )
}

export default ProjectCardComponent