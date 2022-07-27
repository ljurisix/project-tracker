import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  CollaboratorInterface,
  i18n,
  ProjectsResponseInterface,
  store,
  StoreStateInterface,
} from '../../../common/index';
import { getAllProjects, newProject } from '../../../common/redux/projects/projects.actions';

import ProjectCardComponent from './projectCard.component';

function DashboardPageComponent() {
  const { Option } = Select;

  const currentUser = useSelector((state: StoreStateInterface) => state.auth.user);

  const projectsRedux = useSelector((state: StoreStateInterface) => state.projects.projects);

  const [projects, setProjects] = useState<ProjectsResponseInterface>();
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

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  console.log('P: ' + projects);
  console.log('PR: ' + projectsRedux);

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {
    setProjects(projects?.data.filter((p) => p.creator?.id === currentUser?.id) as any);

    const unsub = store.subscribe(() => {
      setProjects(projects?.data.filter((p) => p.creator?.id === currentUser?.id) as any);
    });

    return unsub;
  }, [currentUser, projects]);

  let projekti = projectsRedux?.map((el) => <ProjectCardComponent key={el.id} project={el}></ProjectCardComponent>);

  async function handleSubmission(name: string, user: number, description: string) {
    let creator: CollaboratorInterface = { user_id: user, user: currentUser! };

    const collaborators: CollaboratorInterface[] = [];

    let addProject = {
      name: name,
      description: description,
      collaborators: collaborators,
    };

    addProject.collaborators.push(creator);

    dispatch(newProject(addProject as any));
  }

  return (
    <div>
      <Drawer
        className="formDrawer"
        width={600}
        title={i18n.translate(`project.edit.details`)}
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
                let name = form.getFieldValue('projectName');
                let currentuser = +currentUser?.id!;
                let description = form.getFieldValue('projectDescription');
                console.log(currentUser);
                handleSubmission(name, currentuser, description);
                form.resetFields();
                setVisible(false);
              })
              .catch((info) => {
                console.log(info);
              });
          }}
        >
          <Form.Item name="projectName" label={i18n.translate(`project.edit.name`)} rules={[{ required: true, message: i18n.translate(`login.msgs.required`) }]}>
            <Input placeholder="Enter project name" />
          </Form.Item>
          <Form.Item label={i18n.translate(`project.edit.details`)} name={'projectDescription'}>
            <TextArea rows={4}>
              <br />
              <br />
            </TextArea>
          </Form.Item>

          <Form.Item className="btnRow">
            <Button type="primary" htmlType="submit">
              {i18n.translate(`project.btns.submit`)}
            </Button>
            <Button htmlType="button" onClick={onCancel}>
              {i18n.translate(`project.btns.cancel`)}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <div className="projectContainer">
        {projekti?.length === 0 && <h2>{i18n.translate(`dashboard.noProjects`)}</h2>}
        {projekti}{' '}
      </div>
      <Button
        type="primary"
        onClick={() => {
          showDrawer();
        }}
      >
        {i18n.translate(`dashboard.newProj`)}
      </Button>
    </div>
  );
}

export default DashboardPageComponent;
