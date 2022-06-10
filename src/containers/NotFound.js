import React from "react";
import { Typography } from "antd";
import { Container } from "../components";

const { Title } = Typography;

const NotFound = () => {
  return (
    <>
      <Container>
        <Title level={1}>Not Found</Title>
      </Container>
      <Container>
        <Title level={3}>
          Sorry, we couldn't find the page you are looking for !
        </Title>
      </Container>
    </>
  );
};

export { NotFound };
