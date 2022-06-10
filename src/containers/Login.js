import React from "react";
import { Form, Card } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  CustomForm,
  CustomInput,
  CustomPasswordInput,
  CustomButton,
  CustomTitle,
} from "../components";
import { loginFormDetails } from "../form-data/login";
import { loginUser } from "../slices";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const response = await dispatch(loginUser(values));
    if (!response.error) {
      navigate("/");
    }
  };

  const onFill = () => {
    form.setFieldsValue({
      username: process.env.REACT_APP_GUEST_USERNAME,
      password: process.env.REACT_APP_GUEST_PASSWORD,
    });
  };

  return (
    <Container height="90vh">
      <Card
        title={
          <Container>
            <CustomTitle level={3}>Login</CustomTitle>
          </Container>
        }
      >
        <CustomForm
          form={form}
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          {loginFormDetails.map(({ label, name, rules, type }, index) => (
            <Form.Item key={index} label={label} name={name} rules={rules}>
              {type === "password" ? <CustomPasswordInput /> : <CustomInput />}
            </Form.Item>
          ))}
          <Form.Item>
            <CustomButton type="primary" htmlType="submit">
              Login
            </CustomButton>
          </Form.Item>
          <Form.Item>
            <CustomButton
              ghost
              onClick={onFill}
              type="primary"
              htmlType="submit"
            >
              Guest Login
            </CustomButton>
          </Form.Item>
          <Form.Item>
            <CustomButton
              onClick={() => navigate("/signup")}
              type="secondary"
              htmlType="submit"
            >
              Don't have an account ?
            </CustomButton>
          </Form.Item>
        </CustomForm>
      </Card>
    </Container>
  );
};

export { Login };
