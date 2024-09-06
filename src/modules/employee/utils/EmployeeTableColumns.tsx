import { Button, Popconfirm, Space } from "antd";
import { TableProps } from "antd/lib";
import { IEmployee } from "../types/employeeTypes";
import dayjs from "dayjs";
import {
  useDeleteEmployeeMutation,
  useEmployeeAssignToAdminMutation,
} from "../api/employeeEndPoint";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";
import UpdateEmployee from "../components/UpdateEmployee";
import EmployeeDetails from "../pages/EmployeeDetails";
import { RootState } from "../../../app/store/store";

export const EmployeeTableColumns = (): TableProps<IEmployee>["columns"] => {
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [assignToAdmin] = useEmployeeAssignToAdminMutation();
  const dispatch = useDispatch();
  const { roleId } = useSelector((state: RootState) => state.userSlice);
  const confirm = (id: number) => {
    if (id) {
      deleteEmployee(id);
    }
  };
  return [
    {
      title: "Employee ID",
      dataIndex: "employee_id",
      key: "employee_id",
    },

    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contact_no",
      key: "contact_no",
    },

    {
      title: "Date of Joining",
      dataIndex: "joining_date",
      key: "joining_date",
      render: (joining_date) => dayjs(joining_date).format("DD-MM-YYYY"),
    },
    {
      title: "Unit Name",
      dataIndex: "unit_name",
      key: "unit_name",
    },
    {
      title: "Actions",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            size="small"
            type="primary"
            onClick={() => {
              dispatch(
                setCommonModal({
                  title: "Employee Details",
                  content: <EmployeeDetails employee={record} />,
                  show: true,
                  width: 740,
                })
              );
            }}
          >
            <EyeOutlined />
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              dispatch(
                setCommonModal({
                  title: "Update Employee",
                  content: <UpdateEmployee employee={record} />,
                  show: true,
                  width: 678,
                })
              );
            }}
          >
            <EditOutlined />
          </Button>
          {roleId === 1 && (
            <>
              <Popconfirm
                title="Delete the employee"
                description="Are you sure to delete this employee?"
                onConfirm={() => confirm(record?.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger size="small" type="primary">
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
              <Popconfirm
                title="Assign to admin"
                description="Are you sure to assign this employee as a admin?"
                onConfirm={() => assignToAdmin(record?.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button size="small" type="primary">
                  Assign
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];
};
