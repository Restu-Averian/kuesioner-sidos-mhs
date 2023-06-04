import { Button, Col, Image, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Row gutter={[16, 32]} justify="center" style={{ textAlign: "center" }}>
      <Col span={24}>
        <Typography.Title>Page Not Found</Typography.Title>
      </Col>
      <Col span={24}>
        <Image src="https://media.tenor.com/YSHdPP-LR1cAAAAi/star-rail-kuru.gif" />
      </Col>
      <Col>
        <Button onClick={() => navigate("/")}>Back</Button>
      </Col>
    </Row>
  );
};

export default NotFound;
