import { Form, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Container,
  CustomForm,
  CustomInput,
  CustomPasswordInput,
  CustomButton,
  CustomTitle,
} from "../components";
import { signupFormDetails } from "../form-data/signup";
import { signupUser } from "../slices";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const response = dispatch(signupUser(values));
    if (!response.error) {
      navigate("/");
    }
  };

  return (
    <Container height="100vh">
      <Card
        title={
          <Container>
            <CustomTitle level={3}>Signup</CustomTitle>
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
          {signupFormDetails.map(
            ({ label, name, rules, type, dependencies }, index) => (
              <Form.Item
                key={index}
                label={label}
                name={name}
                rules={rules}
                dependencies={dependencies}
              >
                {type === "password" ? (
                  <CustomPasswordInput />
                ) : (
                  <CustomInput />
                )}
              </Form.Item>
            )
          )}
          <Form.Item>
            <CustomButton type="primary" htmlType="submit">
              Signup
            </CustomButton>
          </Form.Item>
          <Form.Item>
            <CustomButton
              ghost
              onClick={() => navigate("/login")}
              type="primary"
              htmlType="submit"
            >
              Already have an account ?
            </CustomButton>
          </Form.Item>
        </CustomForm>
      </Card>
    </Container>
  );
};

export { Signup };
