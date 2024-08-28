import { Card, Col, Input, Row, Select, Space, Table } from "antd";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IEmployeeParams } from "../types/employeeTypes";
import {
  useGetEmployeesQuery,
  useGetOverallEmployeesQuery,
} from "../api/employeeEndPoint";
import { setCommonModal } from "../../../app/slice/modalSlice";
import CreateEmployee from "../components/CreateEmployee";
import { EmployeeTableColumns } from "../utils/EmployeeTableColumns";
import { CreateButton } from "../../../common/CommonButton";
import { SearchOutlined } from "@ant-design/icons";
import {
  generatePagination,
  tablePagination,
} from "../../../common/TablePagination copy";
import EmployeeFileUpdate from "./EmployeeFileUpdate";
import PDFDownload from "../../../common/PDFDownload/PDFDownload";
import dayjs from "dayjs";
import ExcelDownload from "../../../common/ExcelDownload/ExcelDownload";
const { Option } = Select;

const EmployeeList = () => {
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 50,
  });

  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    pageSize: "50",
  });
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "50";
  const skipValue = (Number(page) - 1) * Number(pageSize);

  const [filter, setFilter] = useState<IEmployeeParams>({
    limit: Number(pageSize),
    offset: skipValue,
  });

  useEffect(() => {
    setFilter({
      limit: Number(pageSize),
      offset: skipValue,
    });
  }, [page, pageSize, skipValue]);

  const { data, isLoading } = useGetEmployeesQuery({ ...filter });
  const { data: allEmployees } = useGetOverallEmployeesQuery();

  const showModal = () => {
    dispatch(
      setCommonModal({
        title: "Create Employee",
        content: <CreateEmployee />,
        show: true,
        width: 678,
      })
    );
  };

  return (
    <>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: 6,
          flexWrap: "wrap",
        }}
      >
        <CreateButton name=" Create employee" onClick={showModal} />
        <CreateButton name=" Create employee" onClick={showModal} />
        <CreateButton name=" Create employee" onClick={showModal} />
        <CreateButton name=" Create employee" onClick={showModal} />
        <CreateButton name=" Create employee" onClick={showModal} />
        <CreateButton name=" Create employee" onClick={showModal} />
        <CreateButton name=" Create employee" onClick={showModal} />
        <CreateButton name=" Create employee" onClick={showModal} />
      </div> */}
      <div>
        <Card
          title={`Employee List`}
          style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
            marginBottom: "1rem",
          }}
          extra={
            <Space>
              <Input
                prefix={<SearchOutlined />}
                onChange={(e) =>
                  setFilter({ ...filter, key: e.target.value, offset: 0 })
                }
                placeholder="Search..."
              />
              <Select
                style={{ width: "180px" }}
                onChange={(e) => setFilter({ ...filter, unit: e, offset: 0 })}
                placeholder="Select Unit Name"
              >
                <Option value="">All</Option>
                <Option value="JTML">JTML</Option>
                <Option value="DIPL">DIPL</Option>
                <Option value="Corporate Office">Corporate Office</Option>
              </Select>
              <>
                <PDFDownload
                  PDFFileName="employee_list"
                  fileHeader="EMPLOYEE LIST"
                  PDFHeader={[
                    "Employee ID",
                    "Employee Name",
                    "Department",
                    "Designation",
                    "Email",
                    "Contact No",
                    "Date of Joining",
                    "Unit Name",
                  ]}
                  PDFData={
                    allEmployees?.data?.length
                      ? allEmployees?.data?.map(
                          ({
                            employee_id,
                            name,
                            department,
                            designation,
                            email,
                            contact_no,
                            joining_date,
                            unit_name,
                          }: any) => {
                            const data = {
                              "Employee ID": employee_id,
                              "Employee Name": name,
                              Department: department,
                              Designation: designation,
                              Email: email,
                              "Contact No": contact_no,
                              "Date of Joining":
                                dayjs(joining_date).format("DD-MM-YYYY"),
                              "Unit Name": unit_name,
                            };
                            return data;
                          }
                        )
                      : []
                  }
                />
              </>

              <Space>
                <ExcelDownload
                  excelName={"employee_list"}
                  excelTableHead={[
                    "Employee ID",
                    "Employee Name",
                    "Department",
                    "Designation",
                    "Email",
                    "Contact No",
                    "Date of Joining",
                    "Unit Name",
                  ]}
                  excelData={
                    allEmployees?.data?.length
                      ? allEmployees?.data?.map(
                          ({
                            employee_id,
                            name,
                            department,
                            designation,
                            email,
                            contact_no,
                            joining_date,
                            unit_name,
                          }: any) => {
                            const data = {
                              "Employee ID": employee_id,
                              "Employee Name": name,
                              Department: department,
                              Designation: designation,
                              Email: email,
                              "Contact No": contact_no,
                              "Date of Joining":
                                dayjs(joining_date).format("DD-MM-YYYY"),
                              "Unit Name": unit_name,
                            };
                            return data;
                          }
                        )
                      : []
                  }
                />
              </Space>
              <CreateButton
                name="Upload employee"
                onClick={() => {
                  dispatch(
                    setCommonModal({
                      title: "Upload Employee",
                      content: <EmployeeFileUpdate />,
                      show: true,
                      width: 400,
                    })
                  );
                }}
              />
              <CreateButton name=" Create employee" onClick={showModal} />
            </Space>
          }
        >
          <div>
            <Table
              rowKey={"id"}
              size="small"
              bordered
              loading={isLoading}
              dataSource={data?.data?.length ? data.data : []}
              columns={EmployeeTableColumns()}
              scroll={{ x: true }}
              pagination={{
                ...generatePagination(
                  Number(data?.total),
                  setPagination,
                  pagination
                ),
                current: Number(page),
                showSizeChanger: true,
                defaultPageSize: 50,
                pageSizeOptions: [
                  "10",
                  "20",
                  "50",
                  "100",
                  "200",
                  "300",
                  "400",
                  "500",
                ],
                total: data ? Number(data?.total) : 0,
                showTotal: (total) => `Total ${total} `,
              }}
              onChange={(pagination) => {
                setSearchParams({
                  page: String(pagination.current),
                  pageSize: String(pagination.pageSize),
                });
                setFilter({
                  ...filter,
                  offset:
                    ((pagination.current || 1) - 1) *
                    (pagination.pageSize || 50),
                  limit: pagination.pageSize!,
                });
              }}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default EmployeeList;
