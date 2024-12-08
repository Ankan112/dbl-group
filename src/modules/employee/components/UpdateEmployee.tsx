/* eslint-disable @typescript-eslint/no-explicit-any */
import { SendOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, InputNumber, Row, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "../../../app/api/userApi";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { DateInput } from "../../../common/formItem/FormItems";
import { validateMobileNumber } from "../../../common/phoneNumberValidator";
import { useGetLicensesQuery } from "../../Licenses/api/licenseEndPoint";
import { useUpdateEmployeeMutation } from "../api/employeeEndPoint";
import { IEmployee, IFromData } from "../types/employeeTypes";
const { Option } = Select;

const UpdateEmployee = ({ employee }: { employee: IEmployee }) => {
  const { data: profile } = useGetMeQuery();
  console.log(profile?.data?.role_id);
  const {
    id,
    role_id,
    employee_id,
    name,
    designation,
    department,
    email,
    contact_no,
    joining_date,
    unit_name,
    status,
    licenses,
    blood_group,
    business_type,
    line_of_business,
    grade,
    pabx,
  } = employee || {};
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [UpdateEmployee, { isLoading, isSuccess }] =
    useUpdateEmployeeMutation();
  const { data } = useGetLicensesQuery({ status: "active" });
  const { refetch } = useGetMeQuery();
  useEffect(() => {
    form.setFieldsValue({
      employee_id,
      name,
      department,
      designation,
      email,
      contact_no,
      unit_name,
      status,
      licenses: licenses?.map((item) => item?.id),
      blood_group,
      business_type,
      line_of_business,
      grade,
      pabx,
    });
    if (joining_date) {
      form.setFieldValue("joining_date", dayjs(joining_date));
    } else {
      form.setFieldValue("joining_date", null);
    }
  }, [
    form,
    employee_id,
    name,
    department,
    designation,
    email,
    contact_no,
    unit_name,
    status,
    joining_date,
    blood_group,
    business_type,
    line_of_business,
    grade,
    pabx,
  ]);

  // const setFileField = (field: string, path: any) => {
  //   if (path) {
  //     form.setFieldsValue({
  //       [field]: [
  //         {
  //           name: path.split("/")[1],
  //           status: "done",
  //           url: imageURL + path,
  //         },
  //       ],
  //     });
  //   }
  // };

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

    UpdateEmployee({ data: formattedData, id });
  };
  useEffect(() => {
    if (isSuccess) {
      refetch();
      dispatch(setCommonModal());
    }
  }, [isSuccess]);
  return (
    <>
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
                    <Input
                      placeholder="Enter Employee Designation"
                      type="text"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="contact_no"
                    label="Contact No"
                    rules={[
                      { required: true, validator: validateMobileNumber },
                    ]}
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
                    label="Unit Name"
                    name="unit_name"
                    rules={[{ required: true, message: "Please Select Unit" }]}
                  >
                    <Select placeholder="Select Unit Name">
                    <Option value="FFL2">FFL2</Option>
                    <Option value="Mawna Fashions Ltd">Mawna Fashions Ltd</Option>
                    <Option value="JTML">JTML</Option>
                    <Option value="DIPL">DIPL</Option>
                    <Option value="Corporate Office">Corporate Office</Option>
                    <Option value="DBTrims Plant">DBTrims Plant</Option>
                    <Option value="PPPL Plant">PPPL Plant</Option>
                    <Option value="EUDB">EUDB</Option>
                    <Option value="Thanbee Complex">Thanbee Complex</Option>
                    <Option value="Flamingo2">Flamingo2</Option>
                    <Option value="Matin Complex">Matin Complex</Option>
                    <Option value="Mymun Complex">Mymun Complex</Option>
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
                    label="Licenses"
                    name="licenses"
                    // rules={[
                    //   { required: true, message: "Please Select License Type" },
                    // ]}
                  >
                    <Select
                      mode="multiple"
                      disabled={
                        role_id === 3 && profile?.data?.role_id === 3
                          ? true
                          : false
                      }
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
                  Update
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default UpdateEmployee;
