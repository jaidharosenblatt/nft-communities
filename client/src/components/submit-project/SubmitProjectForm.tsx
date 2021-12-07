import { Button, Col, DatePicker, Form, Input, InputNumber, Row } from "antd";
import { submitProject } from "../../redux/actionCreators";
import { useAppDispatch } from "../../redux/hooks";

export default function SubmitProjectForm() {
  const fullWidthStyle = { width: "100%" };
  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    dispatch(submitProject(values));
    form.resetFields();
  };
  const [form] = Form.useForm();

  function errorRule(fieldName: string) {
    const capitalized = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    return [{ required: true, message: `${capitalized} is required` }];
  }

  return (
    <div>
      <h2>Submit Collection</h2>
      <p className="caption">
        Collections are manually verified and are updated every few days. If it's been more than a
        week, message @jaidharo on Twitter
      </p>
      <Form
        form={form}
        onFinish={onFinish}
        requiredMark={false}
        className="submit-form"
        layout="vertical"
      >
        <Form.Item label="Collection Name" name="name" rules={errorRule("name")}>
          <Input placeholder="Degenerate Ape Academy" />
        </Form.Item>
        <Form.Item rules={errorRule("Twitter username")} label="Twitter Username" name="twitter">
          <Input placeholder="DegenApeAcademy" />
        </Form.Item>
        <Form.Item rules={errorRule("Discord")} label="Discord Link" name="discordUrl">
          <Input placeholder="https://discord.gg/abcd" />
        </Form.Item>
        <Form.Item rules={errorRule("website")} label="Website" name="website">
          <Input placeholder="https://www.degenape.academy/" />
        </Form.Item>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item rules={errorRule("supply")} label="Supply" name="quantity">
              <InputNumber placeholder="10,000" min={0} style={fullWidthStyle} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item rules={errorRule("price")} name="price" label="Price">
              <InputNumber placeholder="6" addonAfter="SOL" min={0} style={fullWidthStyle} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item rules={errorRule("mint date")} name="releaseData" label="Mint Date">
          <DatePicker style={fullWidthStyle} format="MM/DD/YYYY" />
        </Form.Item>
        <Form.Item rules={errorRule("description")} name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Button style={fullWidthStyle} htmlType="submit" type="primary">
          Submit for Review
        </Button>
      </Form>
    </div>
  );
}
