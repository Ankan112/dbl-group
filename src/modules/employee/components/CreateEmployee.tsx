/* eslint-disable @typescript-eslint/no-explicit-any */
import { SendOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, InputNumber, Row, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { DateInput } from "../../../common/formItem/FormItems";
import { validateMobileNumber } from "../../../common/phoneNumberValidator";
import { useGetLicensesQuery } from "../../Licenses/api/licenseEndPoint";
import { useCreateEmployeeMutation } from "../api/employeeEndPoint";
import { IFromData } from "../types/employeeTypes";
const { Option } = Select;

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const licenseType = Form.useWatch("need_license", form);
  const [createEmployee, { isLoading, isSuccess }] =
    useCreateEmployeeMutation();
  const { data } = useGetLicensesQuery({ status: "active" });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const onFinish = (values: IFromData) => {
    const formattedData: any = {};

    for (const key in values) {
      if (values[key]) {
        if (key === "joining_date") {
          formattedData[key] = dayjs(values[key]).format("YYYY-MM-DD");
        } else {
          formattedData[key] = values[key];
        }
      }
    }

    // console.log(formattedData);
    createEmployee({ data: formattedData });
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
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{
            joining_date: dayjs(),
            need_license: "No",
          }}
        >
          <Card
            className="border"
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <Row align={"middle"} gutter={[5, 16]}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="employee_id"
                  rules={[{ required: true }]}
                  label="Employee ID"
                  required
                >
                  <Input placeholder="Enter Employee ID" type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="name"
                  rules={[{ required: true }]}
                  label="Employee Name"
                  required
                >
                  <Input placeholder="Enter Employee Name" type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="designation"
                  label="Employee Designation"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter Employee Designation" type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="contact_no"
                  label="Contact No"
                  rules={[{ required: true, validator: validateMobileNumber }]}
                >
                  <Input
                    addonBefore="+88"
                    placeholder="Enter Contact No"
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Employee Email"
                  name="email"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter employee email" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Employee Department"
                  name="department"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter employee department" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <DateInput
                  label="Date of Joining"
                  name="joining_date"
                  placeholder="Select Joining Date"
                  rules={[{ required: true }]}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Payroll Unit"
                  name="unit_name"
                  rules={[{ required: true, message: "Please Select Unit" }]}
                >
                  <Select placeholder="Select Unit Name">
                    {[
                      'Sylhet EZ',
                      'Corporate Office',
                      'Jinnat Apparels Ltd',
                      'Jinnat Knitwears Ltd',
                      'Jinnat Fashions Ltd',
                      'Matin Spinning Mills PLC',
                      'Thanbee Print World Ltd',
                      'Hamza Textiles Ltd',
                      'Flamingo Fashions Ltd',
                      'DB Tex Ltd',
                      'Dulal Brothers Ltd',
                      'Color City Ltd',
                      'DBL Digital Ltd',
                      'Parkway Packaging and Printing Ltd',
                      'Mymun Textiles Ltd',
                      'DBL Pharmaceuticals Ltd',
                      'DBL Ceramics Ltd',
                      'DBL Telecom Ltd',
                      'DBL Distributions Ltd',
                      'DBL Lifestyles Ltd',
                      'Digital Corporate',
                      'ECO Thread Plant',
                      'DBL Dredging Ltd.',
                      'Farmgate Office',
                      'Mawna Fashions Ltd.',
                      'Ceramics Plant',
                      'DB TRIMS Ltd.',
                      'Jinnat Complex',
                      'Mymun Complex',
                      'Glory Textile and Apparels Limited',
                      'DBL Industrial Park Ltd',
                      'Knitting',
                      'Thanbee Complex',
                      'DBL Textile Recycling Ltd',
                      'Matin Complex',
                      'Jinnat Textile Mills Ltd',
                      'Textile Testing Services Ltd',
                      'Atelier Sourcing Ltd',
                      'Mawna Fashions Ltd',
                      'DBL Tours and Travels Limited',
                      'Chittagong C and F Office',
                      'Ceramics Field',
                      'Flamingo2',
                      'Dredging Office',
                      'JKL2',
                      'Pharma Field',
                      'Pharma Plant',
                      'Lifestyle Corporate',
                      'Pharma Corporate',
                      'ECO Thread Corporate',
                      'DBTrims Plant',
                      'Ceramics Corporate',
                      'PPPL Corporate',
                      'EUDB Accessories Limited',
                      'PPPL Plant',
                      'DBL Healthcare Ltd',
                      'EUDB',
                      'DBLCL',
                      'Jinnat Knitting Ltd',
                      'DBL Pharma',
                      'FFL2',
                      'eco Plant',
                      'MSML Complex',
                      'DTRL (Matin Complex)',
                    ].map((unit) => (
                      <Option key={unit} value={unit}>
                        {unit}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Business Type"
                  name="business_type"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter business type" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Line of Business"
                  name="line_of_business"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter line of business" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Grade"
                  name="grade"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter grade" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Blood Group"
                  name="blood_group"
                // rules={[
                //   { required: true, message: "Please select blood group" },
                // ]}
                >
                  <Select showSearch placeholder="Select Blood Group">
                    <Option value="A+">A+</Option>
                    <Option value="A-">A-</Option>
                    <Option value="B+">B+</Option>
                    <Option value="B-">B-</Option>
                    <Option value="AB+">AB+</Option>
                    <Option value="AB-">AB-</Option>
                    <Option value="O+">O+</Option>
                    <Option value="O-">O-</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="PABX" name="pabx">
                  <InputNumber className="w-full" placeholder="Enter pabx" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Need License"
                  name="need_license"
                  rules={[
                    { required: true, message: "Please Select License Type" },
                  ]}
                >
                  <Select placeholder="Select License Type">
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </Form.Item>
              </Col>
              {licenseType === "Yes" && (
                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    label="Licenses"
                    name="licenses"
                    rules={[
                      { required: true, message: "Please Select License Type" },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select License"
                      value={selectedItems}
                      onChange={setSelectedItems}
                      style={{ width: "100%" }}
                      filterOption={(
                        input: string,
                        option?: { label: string; value: number }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={data?.data?.map((item) => ({
                        value: item.id,
                        label: item.title,
                      }))}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Card>

          <Form.Item style={{ marginTop: "1rem" }}>
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

export default CreateEmployee;
