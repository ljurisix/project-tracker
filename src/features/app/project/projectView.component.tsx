import { Button, Drawer, Form, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { i18n, NavigationService, ProjectInterface, store, StoreStateInterface } from '../../../common';
import { editProject } from '../../../common/redux/projects/projects.actions';
import { AppRoutes } from '../_router/app.routes';
import ProjectDividerComponent from './projectDivider.component';

function ProjectViewComponent() {
  const { Option } = Select;

  const [project, setProject] = useState<ProjectInterface>();
  const [updateFlag, setUpdateFlag] = useState(false);

  const projects = useSelector((state: StoreStateInterface) => state.projects.projects);

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const { TextArea } = Input;

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  useEffect(() => {
    setProject(projects.find((p) => p.id == id));
    setUpdateFlag(false);

    const unsub = store.subscribe(() => {
      setProject(projects.find((p) => p.id == id));
    });
  }, [project]);

  useEffect(() => {
    if (!project) {
      let p = projects.find((p) => p.id == id);
      setProject(p);
    }
  }, [projects]);

  function back() {
    NavigationService.navigate(AppRoutes.PROJECTS.fullPath);
  }

  interface ParamTypes {
    id: string;
  }

  let { id } = useParams<ParamTypes>();

  let collaborators = project?.collaborators.map((c) => <p>{c.user_id}</p>);

  let defName = project?.name;
  let defValue = project?.description;

  function onChange() {
    defName = form.getFieldValue('projectName');
    defValue = form.getFieldValue('projectDescription');
  }

  function handleSubmission() {
    if (project != undefined) {
      project.name = defName!;
      project.description = defValue!;
      dispatch(editProject(project as any));
    }
  }

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  console.log(`${project?.conceptual_design}`);

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  return (
    <div>
      <Drawer
        className="formDrawer"
        width={600}
        title="Edit project details"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={() => {
            form
              .validateFields()
              .then(() => {
                handleSubmission();
                form.resetFields();
                setVisible(false);
              })
              .catch((info) => {
                console.log(info);
              });
          }}
        >
          <Form.Item
            name="projectName"
            label="Project name:"
            rules={[{ required: true, message: i18n.translate(`login.msgs.required`) }]}
          >
            <Input defaultValue={defName} placeholder="Enter project name" />
          </Form.Item>
          <Form.Item name={'projectDescription'} label="Project description:">
            <TextArea rows={4} defaultValue={defValue} onChange={onChange}>
              <br />
              <br />
            </TextArea>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              {i18n.translate(`project.submit`)}
            </Button>
            <Button htmlType="button" onClick={onCancel}>
              {i18n.translate(`project.cancel`)}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <div className="general">
        <div className="edit">
          <h3>{i18n.translate(`project.general`)}</h3>
          <Button
            type="text"
            onClick={() => {
              showDrawer();
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
          <div className="divider"></div>
        </div>

        <p>{project?.name}</p>
        <p>{project?.description}</p>

        <div className="edit">
          <h3>{i18n.translate(`project.collaborators`)}</h3>
          <Button
            type="text"
            onClick={() => {
              showDrawer();
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
          <div className="divider"></div>
        </div>

        {collaborators}

        <div className="edit">
          <h3>{i18n.translate(`project.cD`)}</h3>
          <Button
            type="text"
            onClick={() => {
              showDrawer();
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
          <div className="divider"></div>
        </div>

        <p>{`${project?.conceptual_design}`}</p>

        <div className="edit">
          <h3>{i18n.translate(`project.tD`)}</h3>
          <Button
            type="text"
            onClick={() => {
              showDrawer();
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
          <div className="divider"></div>
        </div>

        <p>{`${project?.technical_design}`}</p>
      </div>
      <Button type="primary" onClick={back}>
        {i18n.translate(`project.return`)}
      </Button>
    </div>
  );
}

export default ProjectViewComponent;
