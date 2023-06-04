import { Button, Card, Form, Input, message, Space, Typography } from "antd";
import React, { Fragment } from "react";

const Admin = ({ isAdmin, setIsAdmin }) => {
  const loginHandler = (value) => {
    const { username, password } = value;
    if (username === "restu_vina" && password === "vina_24680") {
      window.location.href = "/admin/home";

      localStorage.setItem("user_login", username);
    } else {
      message.open({
        type: "error",
        content: "Username dan Password salah",
      });
    }
  };
  return (
    <Fragment>
      <Button onClick={() => setIsAdmin(0)}>Back</Button>
      <Space>
        <Card>
          <Typography.Title>Login</Typography.Title>
          <Form
            onFinish={loginHandler}
            name="login_form_admin"
            id="login_admin"
            autoComplete="off"
          >
            <Form.Item name="username">
              <Input />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </Fragment>
  );
};

export default Admin;
