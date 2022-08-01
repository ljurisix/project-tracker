import { Button, Divider, Drawer, Form, Input, Modal, Select } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { formatTimeStr } from 'antd/lib/statistic/utils';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { i18n, NavigationService, ProjectInterface, store, StoreStateInterface } from '../../../common';
import { deleteProject, editProject } from '../../../common/redux/projects/projects.actions';
import { getAllUsers } from '../../../common/redux/users/users.actions';
import { AppRoutes } from '../_router/app.routes';

function ProjectViewComponent() {
  const { Option } = Select;

  const [project, setProject] = useState<ProjectInterface>();
  const [updateFlag, setUpdateFlag] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const projects = useSelector((state: StoreStateInterface) => state.projects.projects);

  const users = useSelector((state: StoreStateInterface) => state.users.users);

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState<SizeType>('middle');

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

  const onFinish = () => {
    setVisible(false);
  };

  const { TextArea } = Input;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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

  let collaborators = project?.collaborators.map((c) => <p>{c.user.email}</p>);

  let defName = project?.name;
  let defValue = project?.description;
  let defCol = project?.collaborators;
  let defCD = project?.conceptual_design;
  let defTD = project?.technical_design;

  const children: React.ReactNode[] = [];

  users.forEach((u) => {
    children.push(<Option key={u.id} value={`${u.id}`}>{u.email}</Option>);
  })

  function handleSubmission() {
    if (project != undefined) {
      project.name = form.getFieldValue('projectName');
      project.description = form.getFieldValue('projectDescription');
      project.collaborators.push(JSON.parse(form.getFieldValue('projectCollaborators')))
      project.conceptual_design = form.getFieldValue('projectCD');;
      project.technical_design = form.getFieldValue('projectTD');

      dispatch(editProject(project as any));
    }
  }

  function handleDelete() {
    Modal.confirm({
      content: i18n.translate(`project.msgs.deleteProj`),
      okText: i18n.translate(`project.btns.okText`),
      cancelText: i18n.translate(`project.btns.cancelText`),
      onOk: () => {
        Modal.confirm({
          content: i18n.translate(`project.msgs.confirm`),
          okText: i18n.translate(`project.btns.okText`),
          cancelText: i18n.translate(`project.btns.cancelText`),
          onOk: () => {
            dispatch(deleteProject(id));
            back();
          },
        });
      },
    });
  }

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


  console.log("COLLAB " + form.getFieldValue('projectCollaborators'));

  console.log(defName);
  console.log(defValue);
  console.log(defCol);
  console.log(defCD);
  console.log(defTD);

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  return (
    <div>
      <Drawer
        className="generalFormDrawer"
        width={600}
        title={i18n.translate(`project.edit.editDetails`)}
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
                onFinish();
              })
              .catch((info) => {
                console.log(info);
              });
          }}
        >
          <Form.Item
            name="projectName"
            label={i18n.translate(`project.edit.name`)}
            style={selectedOption !== 'general' ? { display: 'none' } : { display: 'block' }}
          >
            <Input defaultValue={defName} placeholder={i18n.translate(`project.msgs.placeholder`)} />
          </Form.Item>
          <Form.Item
            name={'projectDescription'}
            label={i18n.translate(`project.edit.description`)}
            style={selectedOption !== 'general' ? { display: 'none' } : {}}
          >
            <TextArea rows={4} defaultValue={defValue}>
              <br />
              <br />
            </TextArea>
          </Form.Item>

          <Form.Item
            name={'projectCollaborators'}
            label={i18n.translate(`project.edit.collabs`)}
            style={selectedOption !== 'collaborators' ? { display: 'none' } : { display: 'block' }}
          >
            <Select
              mode="multiple"
              size={size}
              placeholder="Please select"
              defaultValue={collaborators as any}
              style={{ width: '100%' }}
            >
              {children}
            </Select>
          </Form.Item>

          <Form.Item
            name={'projectCD'}
            label={i18n.translate(`project.msgs.cD`) + ':'}
            style={selectedOption !== 'cD' ? { display: 'none' } : { display: 'block' }}
          >
            <TextArea rows={4} defaultValue={`${defCD}`}>
              <br />
              <br />
            </TextArea>
          </Form.Item>

          <Form.Item
            name={'projectTD'}
            label={i18n.translate(`project.msgs.tD`) + ':'}
            style={selectedOption !== 'tD' ? { display: 'none' } : { display: 'block' }}
          >
            <TextArea rows={4} defaultValue={`${defTD}`}>
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

      <div className="general">
        <Divider className="divider" orientation="left">
          {i18n.translate(`project.msgs.general`)}
          <Button
            type="text"
            onClick={() => {
              setSelectedOption('general');
              showDrawer();
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
        </Divider>

        <strong>{project?.name}</strong>
        <p>{project?.description}</p>

        <Divider className="divider" orientation="left">
          {i18n.translate(`project.msgs.collaborators`)}
          <Button
            type="text"
            onClick={() => {
              setSelectedOption('collaborators');
              showDrawer();
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
        </Divider>

        {collaborators}

        <Divider className="divider" orientation="left">
          {i18n.translate(`project.msgs.cD`)}
          <Button
            type="text"
            onClick={() => {
              setSelectedOption('cD');
              showDrawer();
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
        </Divider>

        <p>{`${project?.conceptual_design}`}</p>

        <Divider className="divider" orientation="left">
          {i18n.translate(`project.msgs.tD`)}
          <Button
            type="text"
            onClick={() => {
              setSelectedOption('tD');
              showDrawer();
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
        </Divider>

        <p>{`${project?.technical_design}`}</p>
      </div>

      <div className="btnRow2">
        <Button type="primary" onClick={back}>
          {i18n.translate(`project.btns.return`)}
        </Button>
        <Button type="dashed" onClick={handleDelete}>
          {i18n.translate(`project.btns.delete`)}
        </Button>
      </div>
    </div>
  );
}

export default ProjectViewComponent;
