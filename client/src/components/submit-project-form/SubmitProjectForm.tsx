import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import React from "react";

export default function SubmitProjectForm() {
  const fullWidthStyle = { width: "100%" };
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      requiredMark={false}
      className="submit-form"
      layout="vertical"
    >
      <Form.Item required label="Collection Name" name="name">
        <Input placeholder="Degenerate Ape Academy" />
      </Form.Item>
      <Form.Item required label="Twitter Username" name="twitter">
        <Input placeholder="DegenApeAcademy" />
      </Form.Item>
      <Form.Item required label="Discord Link" name="discordUrl">
        <Input placeholder="https://discord.gg/abcd" />
      </Form.Item>
      <Form.Item required label="Website" name="website">
        <Input placeholder="https://www.degenape.academy/" />
      </Form.Item>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item required label="Supply" name="quantity">
            <InputNumber placeholder="10,000" min={0} style={fullWidthStyle} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="price" required label="Price">
            <InputNumber placeholder="6" addonAfter="SOL" min={0} style={fullWidthStyle} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="description" required label="Description">
        <Input.TextArea />
      </Form.Item>
      <Button htmlType="submit" style={fullWidthStyle} type="primary">
        Submit for Review
      </Button>
    </Form>
  );
}
