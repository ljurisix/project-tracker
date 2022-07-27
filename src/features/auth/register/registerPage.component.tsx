import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { i18n, NavigationService, RegisterInterface } from '../../../common';
import { registerAction } from '../../../common/redux/users/users.actions';
import { AuthRoutes } from '../_router/auth.routes';

function RegisterPageComponent() {
  const dispatch = useDispatch()
  
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values: any) => {
    let registerData: RegisterInterface = {
      name: values.username,
      email: values.email,
      password: values.password
    }
    dispatch(registerAction(registerData))
  }

  const onFinishFailed = (error: any) => {
    console.log("Failure: ", error)
  }

  function goToLogin() {
    NavigationService.navigate(AuthRoutes.LOGIN.fullPath);
  }

  return (
    <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label={i18n.translate(`login.form.email`)}
        name="email"
        rules={[{ required: true, message: i18n.translate(`login.msgs.requred`) }]}
      >
        <Input />
      </Form.Item>

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

      <Form.Item
        name="confirm"
        label={i18n.translate(`login.form.passConfirm`)}
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: i18n.translate(`login.form.confirmPass`),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(i18n.translate(`login.form.passFail`))
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {i18n.translate(`login.btns.register`)}
        </Button>
        <Button type="link" onClick={goToLogin}>
          {i18n.translate(`login.btns.gotoLogin`)}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterPageComponent;
