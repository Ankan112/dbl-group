/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Form, Input, Button, Select } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useCreateLocationMutation } from "../api/locationEndPoint";
import { useEffect } from "react";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { useGetUnitsQuery } from "../../Unit/api/unitEndPoint";

const CreateLocation = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { data: unitData, isLoading: unitIsLoading } = useGetUnitsQuery({
    status: "active",
  });
  const [create, { isLoading, isSuccess }] = useCreateLocationMutation();

  const onFinish = (value: any) => {
    create(value);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
      form.resetFields();
    }
  }, [isSuccess]);

  return (
    <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Card
            className="border"
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <Row align={"middle"} gutter={[5, 16]}>
              <Col xs={24} sm={24}>
                <Form.Item
                  name="unit_id"
                  rules={[{ required: true }]}
                  label="Unit"
                  required
                >
                  <Select
                    style={{ width: "100%" }}
                    loading={unitIsLoading}
                    placeholder="Select Unit Name"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(
                      input: string,
                      option?: { label: string; value: number }
                    ) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={unitData?.data?.map((unit: any) => ({
                      value: unit.id,
                      label: unit.title,
                    }))}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24}>
                <Form.Item
                  name="location"
                  rules={[{ required: true }]}
                  label="Sub Unit"
                  required
                >
                  <Input placeholder="Enter Sub Unit Name" type="text" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Form.Item>
            <div style={{ textAlign: "end" }}>
              <Button
                htmlType="submit"
                type="primary"
                icon={<SendOutlined />}
                loading={isLoading}
              >
                Create
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default CreateLocation;
