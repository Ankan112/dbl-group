/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Form, Input, Button, Select, DatePicker } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCommonModal } from "../../../app/slice/modalSlice";
import TextArea from "antd/es/input/TextArea";
import { useGetUnitsQuery } from "../../Unit/api/unitEndPoint";
import { useGetOverallEmployeesQuery } from "../../employee/api/employeeEndPoint";
import { IEmployee } from "../../employee/types/employeeTypes";
const { Option } = Select;
const { RangePicker } = DatePicker;
const AssignTask = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { data: unitData, isLoading: unitIsLoading } = useGetUnitsQuery({
    status: "active",
  });
  const { data: allEmployee, isLoading: empLoading } =
    useGetOverallEmployeesQuery();
  const onFinish = (value: any) => {
    // create(value);
  };

  //   useEffect(() => {
  //     if (isSuccess) {
  //       dispatch(setCommonModal());
  //       form.resetFields();
  //     }
  //   }, [isSuccess]);

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
              <Col xs={24} sm={24} md={24} lg={12}>
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
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  label="Select Employee"
                  name="employee_id"
                  rules={[
                    { required: true, message: "Please select Employee" },
                  ]}
                >
                  <Select
                    loading={empLoading}
                    placeholder="Search Employee"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={allEmployee?.data?.map((item: IEmployee) => ({
                      value: item.id,
                      label: `[${item.employee_id}] ${item.name} (${item.email})`,
                    }))}
                    allowClear
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  name="title"
                  rules={[{ required: true }]}
                  label="Title"
                >
                  <Input placeholder="Enter Task Title" type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  name="start_date"
                  rules={[{ required: true }]}
                  label="Start and End Date"
                >
                  <DatePicker.RangePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  name="start_time"
                  rules={[{ required: true }]}
                  label="Start Time"
                >
                  <DatePicker.TimePicker
                    style={{ width: "100%" }}
                    format="hh:mm A"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  name="end_time"
                  rules={[{ required: true }]}
                  label="End Time"
                >
                  <DatePicker.TimePicker
                    style={{ width: "100%" }}
                    format="hh:mm A"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  label="Select List"
                  name="list"
                  rules={[{ required: true, message: "Please select a list!" }]}
                >
                  <Select placeholder="Select list">
                    <Option value="My Tasks">My Tasks</Option>
                    <Option value="Today Tasks">Today Tasks</Option>
                    <Option value="Yearly Plan">Yearly Plan</Option>
                    <Option value="Movie Goals">Movie Goals</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item label="Description" name="description">
                  <TextArea placeholder="Enter Description" />
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
                // loading={isLoading}
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

export default AssignTask;
