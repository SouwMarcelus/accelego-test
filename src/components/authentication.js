"use client";

import { useState } from "react";
import { Button, Card, Flex, Form, Input, message } from "antd";
import {
  ArrowLeftOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Spinner from "./spinner";

export default function Authentication({
  authMethod,
  updateAuthenticating,
  updateLoggedIn,
  updateUser,
  user,
}) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  let users = [];

  async function getUsers() {
    let totalPages = 0;
    users = [];

    const response = await fetch("https://reqres.in/api/users", {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseBody = await response.json();

    totalPages = responseBody.total_pages;

    for (let page = 1; page <= totalPages; page++) {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseBody = await response.json();

      users = users.concat(responseBody.data);
    }
  }

  function successMessage(message) {
    messageApi.open({
      type: "success",
      content: message,
    });
  }

  function warningMessage(message) {
    messageApi.open({
      type: "warning",
      content: message,
    });
  }

  function errorMessage(error) {
    messageApi.open({
      type: "error",
      content: error,
    });
  }

  async function handleFormFinish(values) {
    setLoading(true);

    if (authMethod.toLowerCase() === "login") {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const responseBody = await response.json();

      if (responseBody.error) {
        errorMessage(responseBody.error);
      } else {
        await getUsers();

        for (let i = 0; i < users.length; i++) {
          if (users[i].email === values.email) {
            const newUser = { ...users[i] };
            newUser.favourites = [];

            updateUser(newUser);
            console.log(newUser);
            break;
          }
        }

        successMessage("Successfully logged in.");
        updateLoggedIn(true);
        updateAuthenticating(false);
      }
    } else if (authMethod.toLowerCase() === "register") {
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const responseBody = await response.json();

      if (responseBody.error) {
        errorMessage(responseBody.error);
      } else {
        await getUsers();

        for (let i = 0; i < users.length; i++) {
          if (users[i].email === values.email) {
            const newUser = { ...users[i] };
            newUser.favourites = [];

            updateUser(newUser);
            console.log(newUser);
            break;
          }
        }

        successMessage("Successfully registered.");
        updateLoggedIn(true);
        updateAuthenticating(false);
      }
    }

    setLoading(false);
  }

  return (
    <Flex
      vertical
      gap="small"
      justify="center"
      align="center"
      className="h-full w-full"
    >
      {contextHolder}
      {loading ? <Spinner /> : null}

      <Flex justify="start" align="start" className="absolute left-5 top-16">
        <Button
          onClick={() => {
            updateAuthenticating(false);
          }}
        >
          <span>
            <ArrowLeftOutlined />
          </span>
        </Button>
      </Flex>

      <Card title={authMethod} className="w-96">
        <Form name="basic" onFinish={handleFormFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className="flex items-center justify-center">
            <Button type="primary" htmlType="submit">
              {authMethod}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
}
