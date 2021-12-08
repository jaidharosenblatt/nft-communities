import { Button, Col, DatePicker, Form, Input, InputNumber, Row } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { submitProject } from "../../redux/actionCreators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setResetForm } from "../../redux/submitCollection";

export default function SubmitProjectForm() {
  const fullWidthStyle = { width: "100%" };
  const dispatch = useAppDispatch();
  const resetForm = useAppSelector((state) => state.submitCollection.resetForm);
  const loading = useAppSelector((state) => state.status.loading);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    dispatch(submitProject(values));
  };

  useEffect(() => {
    if (resetForm) {
      console.log(resetForm);

      form.resetFields();
    }
    return () => {
      dispatch(setResetForm(false));
    };
  }, [resetForm]);

  function disabledDate(current: any) {
    // Can not select days before today and today
    return current < moment().startOf("day");
  }

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
          <DatePicker disabledDate={disabledDate} style={fullWidthStyle} format="MM/DD/YYYY" />
        </Form.Item>
        <Form.Item rules={errorRule("description")} name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Button loading={false} style={fullWidthStyle} htmlType="submit" type="primary">
          Submit for Review
        </Button>
      </Form>
    </div>
  );
}
