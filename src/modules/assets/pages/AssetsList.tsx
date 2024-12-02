import { FilterOutlined,SearchOutlined } from "@ant-design/icons";
import { Card, Button,Dropdown,Input, Select, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useGetMeQuery } from "../../../app/api/userApi";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { CreateButton } from "../../../common/CommonButton";
import ExcelDownload from "../../../common/ExcelDownload/ExcelDownload";
import { generatePagination } from "../../../common/TablePagination copy";
import { useGetUnitsQuery } from "../../Unit/api/unitEndPoint";
import {
  useGetAssetsForAdminQuery,
  useGetAssetsQuery,
} from "../api/assetsEndPoint";
import CreateAsset from "../components/CreateAssets";
import UploadAssetFile from "../components/UploadAssetFile";
import { IAssetParams } from "../types/assetsTypes";
import { AssetsTableColumns } from "../utils/AssetsTableColumns";
import { useGetActiveLocationsQuery } from "../../location/api/locationEndPoint";

const AssetsList = () => {
  const { Option } = Select;
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
  const { data: profile } = useGetMeQuery();
  const { data: locationData, isLoading: locationIsLoading } =
    useGetActiveLocationsQuery({});
  const { data: unitData, isLoading: unitIsLoading } = useGetUnitsQuery({
    status: "active",
  });
  const unitOptionForAdmin = unitData?.data?.filter((unit) =>
    profile?.data?.searchAccess?.some((item: any) => item?.unit_id === unit?.id)
  );
  const unitOption =
    profile?.data?.role_id === 2 ? unitOptionForAdmin : unitData?.data;
  const [filter, setFilter] = useState<IAssetParams>({
    limit: Number(pageSize),
    offset: skipValue,
  });

  const locationOption = locationData?.data?.filter(
    (item) => item.unit_id === filter.unit
  );

  useEffect(() => {
    setFilter({
      ...filter,
      limit: Number(pageSize),
      offset: skipValue,
    });
  }, [page, pageSize, skipValue]);
  const { data, isLoading, isFetching } = useGetAssetsQuery({ ...filter });
  const {
    data: adminData,
    isLoading: adminLoading,
    isFetching: adminFetching,
  } = useGetAssetsForAdminQuery({ ...filter });

  const assetsTableData = profile?.data?.role_id === 2 ? adminData : data;
  // console.log(assetsTableData?.data);
  const showModal = () => {
    dispatch(
      setCommonModal({
        title: "Create Assets",
        content: <CreateAsset />,
        show: true,
        width: 880,
      })
    );
  };

  return (
    <>
      <div>
        <Card
          title={`Assets List `}
          style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
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
                style={{ width: "160px" }}
                prefix={<SearchOutlined />}
                onChange={(e) =>
                  setFilter({ ...filter, key: e.target.value, offset: 0 })
                }
                placeholder="Search..."
              />
            </div>
            <Select
              style={{ width: "160px" , marginBottom: 8}}
              loading={unitIsLoading}
              placeholder="Select Unit Name"
              showSearch
              optionFilterProp="children"
              onChange={(e) => {
                setFilter({ ...filter, unit: e, offset: 0 });
              }}
              filterOption={(
                input: string,
                option?: { label: string; value: number }
              ) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={unitOption?.map((unit: any) => ({
                value: unit.id,
                label: unit.title,
              }))}
              allowClear
            />


            <Dropdown
            trigger={["hover"]}
            dropdownRender={() => (
              <div
                style={{
                  padding: 16,
                  background: "#fff",
                  borderRadius: 8,
                  width: "190px",
                  border: "1px solid #f2f2f2",
                }}
              >
                <Select
              style={{ width: "180px" , marginBottom: 8}}
              loading={locationIsLoading}
              placeholder="Select Location"
              showSearch
              optionFilterProp="children"
              onChange={(e) => setFilter({ ...filter, location: e, offset: 0 })}
              filterOption={(
                input: string,
                option?: { label: string; value: number }
              ) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={locationOption?.map((location: any) => ({
                value: location.id,
                label: location.location,
              }))}
              allowClear
            />
                
                <Select
              allowClear
              style={{ width: "180px" , marginBottom: 8}}
              onChange={(e) => setFilter({ ...filter, type: e, offset: 0 })}
              placeholder="Select Remark Type"
            >
              <Option value="">All</Option>
              <Option value="assigned">Assigned</Option>
              <Option value="in_stock">In Stock</Option>
            </Select>
            
            
            
              
                
              </div>
            )}
          >
            <Button icon={<FilterOutlined />}>Filters</Button>
          </Dropdown>




           

            <ExcelDownload
              excelName={"asset-list"}
              excelTableHead={[
                "Asset Name",
                "Category",
                "Model",
                "Serial No",
                "PO No",
                "Specification",
                "Remarks",
                "Unit",
                "Location",
                "Purchase Date",
                "Price",
                "Warranty",
              ]}
              excelData={
                data?.data?.length
                  ? data?.data?.map(
                      ({
                        serial_number,
                        remarks,
                        model,
                        category,
                        po_number,
                        specification,
                        unit_name,
                        location_name,
                        name,
                        purchase_date,
                        price,
                        warranty,
                      }: any) => {
                        const data = {
                          "Asset Name": name,
                          Category: category,
                          Model: model,
                          "Serial No": serial_number,
                          "PO No": po_number,
                          Specification: specification,
                          Remarks: remarks,
                          Unit: unit_name,
                          Location: location_name,
                          "Purchase Date":
                            dayjs(purchase_date).format("DD-MM-YYYY"),
                          Price: price,
                          Warranty: warranty,
                        };
                        return data;
                      }
                    )
                  : []
              }
            />
            <CreateButton
              name="Upload Asset"
              onClick={() => {
                dispatch(
                  setCommonModal({
                    title: "Upload Asset",
                    content: <UploadAssetFile />,
                    show: true,
                    width: 400,
                  })
                );
              }}
            />
            <CreateButton name="Create Assets" onClick={showModal} />
          </div>
          <div>
            <Table
              rowKey={"id"}
              size="small"
              bordered
              loading={isLoading || isFetching}
              dataSource={
                assetsTableData?.data?.length ? assetsTableData?.data : []
              }
              columns={AssetsTableColumns()}
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
                pageSizeOptions: ["50", "100", "200", "300", "500", "1000"],
                total: data ? Number(assetsTableData?.total) : 0,
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

export default AssetsList;
