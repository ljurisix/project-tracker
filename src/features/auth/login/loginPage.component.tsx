import React from 'react';
import { Form, Input, Button, Checkbox, Switch } from 'antd';
import { useDispatch } from 'react-redux';
import { i18n, loginAction, LoginInterface } from '../../../common';

function LoginPageComponent() {
  const dispatch = useDispatch();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values: any) => {
    let loginData: LoginInterface = {
      email: values.email,
      password: values.password,
    };
    dispatch(loginAction(loginData));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true, username: 'test', password: 'password' }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label={i18n.translate(`login.form.username`)}
        name="username"
        rules={[{ required: true, message: i18n.translate(`login.msgs.requred`) }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={i18n.translate(`login.form.password`)}
        name="password"
        rules={[{ required: true, message: i18n.translate(`login.msgs.requred`) }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>{i18n.translate(`login.form.remember`)}</Checkbox>
        <Switch />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {i18n.translate(`login.btns.login`)}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginPageComponent;
