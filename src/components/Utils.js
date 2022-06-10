import { Form, Input, Button, Typography, Upload } from "antd";
import styled from "styled-components";

const { Title } = Typography;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props?.height};
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: no-wrap;
`;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CustomForm = styled(Form)`
  width: 25rem;
`;

const CustomInput = styled(Input)`
  padding: 0.75rem;
`;

const CustomPasswordInput = styled(Input.Password)`
  padding: 0.75rem;
`;

const CustomButton = styled(Button)`
  padding: 0.25rem;
  width: ${(props) => props?.width || "100%"};
  && {
    height: ${(props) => props?.height || "3rem"};
    span {
      font-size: 1.125rem;
    }
  }
  @media only screen and (max-width: 1000px) {
    &&{
      height: 2.5rem;
  }
  @media only screen and (max-width: 600px) {
    && {
      height: 3rem;
  }
`;

const CustomTitle = styled(Title)`
  margin-bottom: 0 !important;
`;

const CustomUpload = styled(Upload)`
  && {
    .ant-upload {
      width: 100%;
    }
  }
`;

export {
  Flex,
  FlexBetween,
  Container,
  FlexEnd,
  CustomForm,
  CustomButton,
  CustomInput,
  CustomTitle,
  CustomPasswordInput,
  CustomUpload,
};
