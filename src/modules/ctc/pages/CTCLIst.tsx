import { SearchOutlined } from "@ant-design/icons";
import { Card, Input, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ExcelDownload from "../../../common/ExcelDownload/ExcelDownload";
import { generatePagination } from "../../../common/TablePagination copy";
import { useGetAllCTCQuery } from "../api/ctcEndPoint";
import { ICTCParams } from "../types/ctcTypes";
import { CTCTableColumns } from "../utils/CTCTableColumns";
const { Option } = Select;

const CTCList = () => {
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

  const [filter, setFilter] = useState<ICTCParams>({
    limit: Number(pageSize),
    offset: skipValue,
  });

  useEffect(() => {
    setFilter({
      ...filter,
      limit: Number(pageSize),
      offset: skipValue,
    });
  }, [page, pageSize, skipValue]);

  const { data, isLoading, isFetching } = useGetAllCTCQuery({ ...filter });

  return (
    <>
      <div>
        <Card
          title={`CTC List`}
          style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: "12px",
            }}
          >
            <div>
              <Input
                prefix={<SearchOutlined />}
                onChange={(e) =>
                  setFilter({ ...filter, key: e.target.value, offset: 0 })
                }
                placeholder="Search..."
              />
            </div>
            <Select
              style={{ width: "160px" }}
              onChange={(e) =>
                setFilter({ ...filter, unit_name: e, offset: 0 })
              }
              placeholder="Select Unit Name"
            >
              <Option value="JTML">JTML</Option>
                    <Option value="DIPL">DIPL</Option>
                    <Option value="Corporate Office">Corporate Office</Option>
                    <Option value="DBTrims Plant">DBTrims Plant</Option>
                    <Option value="PPPL Plant">PPPL Plant</Option>
                    <Option value="EUDB">EUDB</Option>
                    <Option value="Thanbee Complex">Thanbee Complex</Option>
                    <Option value="Flamingo2">Flamingo2</Option>
            </Select>
            <Space>
              <ExcelDownload
                excelName={"ctc_list"}
                excelTableHead={[
                  "Employee ID",
                  "Employee Name",
                  "Department",
                  "Designation",
                  "Assets",
                  "Unit Name",
                  "Total Asset Cost",
                  "Monthly Asset Cost",
                  "Licenses",
                  "Monthly Licenses Cost",
                  "Total CTC Per Month",
                  "Total CTC Per Year",
                ]}
                excelData={
                  data?.data?.length
                    ? data?.data?.map(
                        ({
                          employee_id,
                          name,
                          department,
                          designation,
                          assets,
                          unit_name,
                          total_asset_price,
                          monthly_asset_cost,
                          licenses,
                          montly_licenses_price,
                          total_ctc_per_month,
                          total_ctc_per_year,
                        }) => {
                          const data = {
                            "Employee ID": employee_id,
                            "Employee Name": name,
                            Department: department,
                            Designation: designation,
                            Assets: assets
                              ?.map((item) => item?.name)
                              .join(", "),
                            "Unit Name": unit_name,
                            "Total Asset Cost": total_asset_price,
                            "Monthly Asset Cost": monthly_asset_cost,
                            Licenses: licenses
                              ?.map((item) => item?.title)
                              .join(", "),
                            "Monthly Licenses Cost": montly_licenses_price,
                            "Total CTC Per Month": total_ctc_per_month,
                            "Total CTC Per Year": total_ctc_per_year,
                          };
                          return data;
                        }
                      )
                    : []
                }
              />
            </Space>
          </div>
          <div>
            <Table
              rowKey={"id"}
              size="small"
              bordered
              loading={isLoading || isFetching}
              dataSource={data?.data?.length ? data.data : []}
              columns={CTCTableColumns()}
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
                pageSizeOptions: ["50", "100", "200", "300", "500","1000"],
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

export default CTCList;
