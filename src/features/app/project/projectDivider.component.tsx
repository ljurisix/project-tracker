import { Button } from 'antd';
import React from 'react';
import { i18n } from '../../../common';

interface Props {
  title: string;
}

function ProjectDividerComponent({ title }: Props) {
  let name = '';

  switch (title) {
    case 'general':
      name = i18n.translate(`project.general`);
    case 'collaborators':
      name = i18n.translate(`project.collaborators`);
    case 'cD':
      name = i18n.translate(`project.cD`);
    case 'tD':
      name = i18n.translate(`project.tD`);
    default:
      name = '???';
  }

  return (
    <div className="edit">
      <h3>{name}</h3>
      <Button type="text">
        <i className="fa-solid fa-pen-to-square"></i>
      </Button>
      <div className="divider"></div>
    </div>
  );
}

export default ProjectDividerComponent;
