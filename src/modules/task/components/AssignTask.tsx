/* eslint-disable @typescript-eslint/no-explicit-any */
import { SendOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { useWatch } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { useGetUnitsQuery } from "../../Unit/api/unitEndPoint";
import { useGetAdminsQuery } from "../../admin/api/adminEndPoint";
import { IAdmin } from "../../admin/types/adminTypes";
import {
  useCreateTaskMutation,
  useGetTaskListQuery,
} from "../api/taskEndpoint";
import { ITaskList, ITaskPost } from "../types/taskTypes";

const AssignTask = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { data: unitData, isLoading: unitIsLoading } = useGetUnitsQuery({
    status: "active",
  });
  const { data: allAdmin, isLoading: adminLoading } = useGetAdminsQuery({});
  const { data: taskList, isLoading: taskLoader } = useGetTaskListQuery();
  const [create, { isSuccess, isLoading }] = useCreateTaskMutation();

  const isAssign = useWatch("is_assign", form);
  const taskCategoriesId = useWatch("task_categories_id", form);

  const onFinish = (values: ITaskPost) => {
    const { start_date, start_time, end_time, unit_id, is_assign, ...rest } =
      values || {};
    const formattedData: ITaskPost = {
      ...rest,
      start_date: dayjs(start_date?.[0])?.format("YYYY-MM-DD"),
      end_date: dayjs(start_date?.[1])?.format("YYYY-MM-DD"),
      start_time: dayjs(start_time)?.format("HH:mm"),
      end_time: dayjs(end_time)?.format("HH:mm"),
    };
    if (is_assign) {
      formattedData.is_assign = 1;
    }
    create(formattedData);
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
            <Row align={"middle"} gutter={[5, 5]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  label="Select List"
                  name="task_categories_id"
                  rules={[{ required: true, message: "Please select a list!" }]}
                >
                  <Select
                    loading={taskLoader}
                    placeholder="Select a list"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={taskList?.data?.map((task: ITaskList) => ({
                      value: task.id,
                      label: task.category_title,
                    }))}
                    allowClear
                  />
                </Form.Item>
              </Col>
              {taskCategoriesId && (
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Form.Item valuePropName="checked" name="topics">
                    <Checkbox>Topic A</Checkbox>
                    <Checkbox>Topic B</Checkbox>
                    <Checkbox>Topic C</Checkbox>
                    <Checkbox>Topic D</Checkbox>
                  </Form.Item>
                </Col>
              )}
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  name="start_date"
                  rules={[{ required: true }]}
                  label="Start Date"
                >
                  <DatePicker style={{ width: "100%" }} />
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
              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item label="Description" name="description">
                  <TextArea placeholder="Enter Description" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item valuePropName="checked" name="is_assign">
                  <Checkbox>Assign Admin</Checkbox>
                </Form.Item>
              </Col>
              {isAssign ? (
                <>
                  <Col xs={24} sm={24} md={24} lg={12}>
                    <Form.Item
                      label="Select Unit"
                      name="unit_id"
                      rules={[
                        { required: true, message: "Please select a unit!" },
                      ]}
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
                      label="Select Admin"
                      name="user_id"
                      rules={[
                        { required: true, message: "Please select Admin" },
                      ]}
                    >
                      <Select
                        loading={adminLoading}
                        placeholder="Search Admin"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={allAdmin?.data?.map((item: IAdmin) => ({
                          value: item.id,
                          label: `[${item.employee_id}] ${item.name} (${item.email})`,
                        }))}
                        allowClear
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </>
              ) : null}
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

export default AssignTask;
