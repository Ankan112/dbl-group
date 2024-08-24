/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Form, Input, Button, Select } from "antd";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { SendOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { DateInput } from "../../../common/formItem/FormItems";
import {
  useGetSingleAssetsQuery,
  useUpdateAssetsMutation,
} from "../api/assetsEndPoint";
import { IAsset } from "../types/assetsTypes";
import { useGetEmployeesQuery } from "../../employee/api/employeeEndPoint";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;

const UpdateAsset = ({ asset }: { asset: IAsset }) => {
  const { data: singleAsset } = useGetSingleAssetsQuery(Number(asset?.id));
  const {
    id,
    name,
    category,
    purchase_date,
    serial_number,
    po_number,
    asset_history,
    is_assign,
    employee_id,
    employee_name,
    assign_date,
    unit_name,
    model,
    specification,
    employee_id_no,
  } = singleAsset?.data || {};
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const assignType = Form.useWatch("assign_update", form);
  const { data } = useGetEmployeesQuery({});
  const [Update, { isLoading, isSuccess }] = useUpdateAssetsMutation();

  useEffect(() => {
    form.setFieldsValue({
      name,
      category,
      serial_number,
      po_number,
      asset_history,
      assign_update: is_assign,
      unit_name,
      model,
      specification,
      purchase_date: dayjs(purchase_date),
      assign_date: assign_date ? dayjs(assign_date) : null,
    });
    form.setFieldValue("employee_id", {
      label: `${employee_id_no} (${employee_name})`,
      value: employee_id,
    });
  }, [
    name,
    category,
    serial_number,
    po_number,
    asset_history,
    is_assign,
    unit_name,
    purchase_date,
    assign_date,
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

  const onFinish = (values: any) => {
    const formattedData: any = {};

    for (const key in values) {
      if (values[key]) {
        if (key === "purchase_date" || key === "assign_date") {
          formattedData[key] = dayjs(values[key]).format("YYYY-MM-DD");
        } else if (key === "employee_id") {
          formattedData[key] = values[key]?.values || values[key];
        } else {
          formattedData[key] = values[key];
        }
      }
    }

    Update({ data: formattedData, id: asset.id });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess]);
  return (
    <>
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{}}
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
                    name="name"
                    rules={[{ required: true }]}
                    label="Asset Name"
                    required
                  >
                    <Input placeholder="Enter Asset Name" type="text" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: "Please Category" }]}
                  >
                    <Select placeholder="Select Category">
                      <Option value="Laptop">Laptop</Option>
                      <Option value="Desktop">Desktop</Option>
                      <Option value="Pinter">Pinter</Option>
                      <Option value="Accessories">Accessories</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="model"
                    rules={[{ required: true }]}
                    label="Model"
                    required
                  >
                    <Input placeholder="Enter Model" type="text" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <DateInput
                    label="Purchase Date"
                    name="purchase_date"
                    placeholder="Select Purchase Date"
                    rules={[{ required: true }]}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Serial Number"
                    name="serial_number"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter serial no" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="PO Number"
                    name="po_number"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter serial no" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Unit Name"
                    name="unit_name"
                    rules={[{ required: true, message: "Please Select Unit" }]}
                  >
                    <Select placeholder="Select Unit Name">
                      <Option value="JTML">JTML</Option>
                      <Option value="DIPL">DIPL</Option>
                      <Option value="Corporate Office">Corporate Office</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Asset History"
                    name="asset_history"
                    rules={[
                      { required: true, message: "Please Select Assign Type" },
                    ]}
                  >
                    <Input placeholder="Enter Asset History" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Assign"
                    name="assign_update"
                    rules={[
                      { required: true, message: "Please Select Assign Type" },
                    ]}
                  >
                    <Select placeholder="Select Assign">
                      <Option value={1}>Yes</Option>
                      <Option value={0}>No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {assignType === 1 && (
                  <>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="employee_id"
                        rules={[{ required: true }]}
                        label="Employee ID"
                        required
                      >
                        <Select
                          className="w-full "
                          placeholder="Select Employee"
                          showSearch
                          optionFilterProp="children"
                          filterOption={(
                            input: string,
                            option?: { label: string; value: string }
                          ) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={data?.data?.map((employee: any) => ({
                            value: employee.id,
                            label: `${employee.employee_id} (${employee.name})`,
                          }))}
                          allowClear
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <DateInput
                        label="Assign Date"
                        name="assign_date"
                        placeholder="Select Assign Date"
                        rules={[{ required: true }]}
                      />
                    </Col>
                  </>
                )}
                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    name="specification"
                    rules={[{ required: true }]}
                    label="Specification"
                    required
                  >
                    <TextArea placeholder="Enter Specification" />
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

export default UpdateAsset;