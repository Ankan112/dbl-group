import React, { useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Row,
  Col,
  Card,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useGetUnitsQuery } from "../../Unit/api/unitEndPoint";
import { useGetCategoryActiveListQuery } from "../../Category/api/categoryEndPoint";
import { useGetEmployeeAllDistributedAssetQuery } from "../../assets/api/assetsEndPoint";
import { useCreateRaiseTicketMutation } from "../api/ticketEndpoint";
import { useGetOverallEmployeesQuery } from "../../employee/api/employeeEndPoint";
import { IEmployee } from "../../employee/types/employeeTypes";

const { Option } = Select;
const { TextArea } = Input;

const RaiseTicketForm = () => {
  const [form] = Form.useForm();
  const { data: unitData, isLoading: unitIsLoading } = useGetUnitsQuery({
    status: "active",
  });
  const { data: allEmployee, isLoading: empLoading } =
    useGetOverallEmployeesQuery();
  const { data, isLoading } = useGetEmployeeAllDistributedAssetQuery({});
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryActiveListQuery({});
  const [create, { isSuccess }] = useCreateRaiseTicketMutation();

  const handleSubmit = (values: any) => {
    const formData = new FormData();
    for (const key in values) {
      if (values[key]) {
        if (key === "attachment") {
          if (values[key][0]?.originFileObj) {
            formData.append(key, values[key][0]?.originFileObj);
          }
        } else {
          formData.append(key, values[key]);
        }
      }
    }
    create(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess, form]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Card
      style={{
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 1200, margin: "auto" }}
      >
        <Row gutter={[16, 16]}>
          {/* Left Card */}
          <Col xs={24} md={8}>
            <Card
              bordered
              hoverable
              style={{
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Form.Item
                label="Select Unit"
                name="unit_id"
                rules={[{ required: true, message: "Please select a unit!" }]}
              >
                <Select
                  loading={unitIsLoading}
                  placeholder="Select Unit Name"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
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

              <Form.Item
                label="Select Category"
                name="category_id"
                rules={[{ required: true, message: "Please select a category!" }]}
              >
                <Select
                  loading={categoryLoading}
                  placeholder="Select Category"
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={categoryData?.data?.map((item) => ({
                    value: item.id,
                    label: item.title,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="Select Priority"
                name="priority"
                rules={[{ required: true, message: "Please select a priority!" }]}
              >
                <Select placeholder="Select Priority">
                  <Option value="low">Low</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="high">High</Option>
                  
                </Select>
              </Form.Item>

              <Form.Item label="Select Asset" name="asset_id">
                <Select
                  loading={isLoading}
                  placeholder="Select Asset Name"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={data?.data?.map((item: any) => ({
                    value: item.id,
                    label: item.asset_name,
                  }))}
                  allowClear
                />
              </Form.Item>
            </Card>
          </Col>

          {/* Right Card */}
          <Col xs={24} md={16}>
            <Card
              bordered
              hoverable
              style={{
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: "Please enter a subject!" }]}
              >
                <Input placeholder="Enter Subject" />
              </Form.Item>

              <Form.Item label="CC" name="cc">
                <Select
                  loading={empLoading}
                  placeholder="Select Employee"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={allEmployee?.data?.map((item: IEmployee) => ({
                    value: item.id,
                    label: `${item.name} (${item.email})`,
                  }))}
                  allowClear
                />
              </Form.Item>

              <Form.Item
                label="Message"
                name="description"
                rules={[{ required: true, message: "Please enter a description!" }]}
              >
                <TextArea rows={4} placeholder="Enter Description" />
              </Form.Item>

              <Form.Item
                name="attachment"
                label="Attachment (Optional)"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  listType="picture"
                  accept="image/*,.pdf"
                  showUploadList={{ showRemoveIcon: true }}
                >
                  <Button style={{ width: "100%" }} icon={<PlusOutlined />}>
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#1775bb",
                  borderColor: "#1775bb",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#144b8b")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1775bb")}
              >
                Raise a Ticket
              </Button>
            </Card>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default RaiseTicketForm;
