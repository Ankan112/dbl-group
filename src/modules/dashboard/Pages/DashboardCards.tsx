import { Card, Col, Row, Typography } from "antd";
import dayjs from "dayjs";
import { FaComputer } from "react-icons/fa6";
import { LuUsers2 } from "react-icons/lu";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "../../../app/api/userApi";
import { RootState } from "../../../app/store/store";
import {
  useGetAllDashboardQuery,
  useGetDashboardAssetDataForAdminQuery,
  useGetDashboardDistributedAssetDataForAdminQuery,
  useGetDashboardEmployeeDataForEmployeeQuery,
} from "../api/dashboardEndPoints";
import GraphChartApex from "../components/ApexChart";
import ApexPieChart from "../components/ApexPieChart";
import BloodTypeChart from "../components/BloodChart";
import TopDash from "../components/TopDash";
import GraphChartV2 from "../components/GraphChartV2";

const DashboardCards = () => {
  const { roleId } = useSelector((state: RootState) => state.userSlice);
  const { data: asset } = useGetDashboardAssetDataForAdminQuery({});
  const { data: distributedAsset } =
    useGetDashboardDistributedAssetDataForAdminQuery({});
  const { data: empData } = useGetDashboardEmployeeDataForEmployeeQuery({});
  const { data } = useGetAllDashboardQuery();
  console.log(empData);
  const { data: profile } = useGetMeQuery();
  const {
    total_assign_asset,
    employee_id,
    department,
    designation,
    email,
    contact_no,
    joining_date,
    unit_name,
    status,
    role_id,
  } = profile?.data || {};
  return (
    <>
      <TopDash />
      {roleId !== 3 ? (
        <Row style={{marginTop:"7px"}} gutter={[12, 12]}>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Link to={"/assets/list"}>
              <Card className="bg-[#ba45ba] text-white card-hover">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px", // Ensures padding is applied to the card content
                    position: "relative",
                  }}
                >
                  <div>
                    <Typography.Title style={{ color: "white" }} level={4}>
                      Total Asset
                    </Typography.Title>
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "22px",
                        fontWeight: "bold",
                        marginTop: "4px",
                      }}
                    >
                      {role_id === 2
                        ? asset?.data?.user_count || 0
                        : data?.data?.total_asset || 0}
                    </p>
                  </div>
                  <div>
                    <div
                      className="bg-[#cf7dcf]"
                      style={{
                        height: "80px",
                        width: "80px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                      }}
                    >
                      <FaComputer size={52} />
                    </div>
                  </div>
                </div>
              </Card>

              <style>
                {`
    .card-hover {
      position: relative;
      overflow: hidden;
      border-radius: 15px; /* More rounded corners */
      transition: transform 0.3s ease, background-color 0.3s ease; /* Smooth zoom-in/out and background transition */
    }

    .card-hover:hover {
      transform: scale(1.05);  /* Slight zoom-in effect */
      background-color: #9f33a0;  /* Subtle background color change */
    }

    .card-hover::before {
      content: "";
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 10px;
      border: 2px solid rgba(255, 255, 255, 0.1); /* Subtle inner border */
      border-radius: 15px; /* Matching rounded corners */
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;  /* Prevent interaction with inner border */
    }

    .card-hover:hover::before {
      opacity: 0;  /* Fade in the inner border */
    }
  `}
              </style>

            </Link>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Link to={"/employee/list"}>
              <Card className="bg-[#ffa500] text-white card-hover-employee">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px", // Ensures padding is applied to the card content
                    position: "relative",
                  }}
                >
                  <div>
                    <Typography.Title style={{ color: "white" }} level={4}>
                      Total Employee
                    </Typography.Title>
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "22px",
                        fontWeight: "bold",
                        marginTop: "4px",
                      }}
                    >
                      {data?.data?.total_employee || 0}
                    </p>
                  </div>
                  <div>
                    <div
                      className="bg-[#ffc14d]"
                      style={{
                        height: "80px",
                        width: "80px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                      }}
                    >
                      <LuUsers2 size={52} />
                    </div>
                  </div>
                </div>
              </Card>

              <style>
                {`
    .card-hover-employee {
      position: relative;
      overflow: hidden;
      border-radius: 15px; /* More rounded corners */
      transition: transform 0.3s ease, background-color 0.3s ease; /* Smooth zoom-in/out and background transition */
    }

    .card-hover-employee:hover {
      transform: scale(1.05);  /* Slight zoom-in effect */
      background-color: #e68900;  /* Slight background color change */
    }

    .card-hover-employee::before {
      content: "";
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 10px;
      border: 2px solid rgba(255, 255, 255, 0.1); /* Subtle inner border */
      border-radius: 15px; /* Matching rounded corners */
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;  /* Prevent interaction with inner border */
    }

    .card-hover-employee:hover::before {
      opacity: 0;  /* Fade in the inner border */
    }
  `}
              </style>

            </Link>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Link to={"/assets/distributed"}>
              <Card className="bg-[#8dc73f] text-white card-hover-disbursements">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px", // Ensures padding is applied to the card content
                    position: "relative",
                  }}
                >
                  <div>
                    <Typography.Title style={{ color: "white" }} level={4}>
                      Total Disbursements
                    </Typography.Title>
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "22px",
                        fontWeight: "bold",
                        marginTop: "4px",
                      }}
                    >
                      {role_id === 2
                        ? distributedAsset?.data?.employee_assign_asset_count || 0
                        : data?.data?.total_assign_asset || 0}
                    </p>
                  </div>
                  <div>
                    <div
                      className="bg-[#acd775]"
                      style={{
                        height: "80px",
                        width: "80px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                      }}
                    >
                      <MdOutlineAssignmentTurnedIn size={52} />
                    </div>
                  </div>
                </div>
              </Card>

              <style>
                {`
    .card-hover-disbursements {
      position: relative;
      overflow: hidden;
      border-radius: 15px; /* More rounded corners */
      transition: transform 0.3s ease, background-color 0.3s ease; /* Smooth zoom-in/out and background transition */
    }

    .card-hover-disbursements:hover {
      transform: scale(1.05);  /* Slight zoom-in effect */
      background-color: #72b92b;  /* Slight background color change */
    }

    .card-hover-disbursements::before {
      content: "";
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 10px;
      border: 2px solid rgba(255, 255, 255, 0.1); /* Subtle inner border */
      border-radius: 15px; /* Matching rounded corners */
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;  /* Prevent interaction with inner border */
    }

    .card-hover-disbursements:hover::before {
      opacity: 0;  /* Fade in the inner border */
    }
  `}
              </style>

            </Link>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Card title="Asset Category Statistics">
              <ApexPieChart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={16}>
            <BloodTypeChart />
          </Col>
          <Col xs={24} sm={24} md={24}>
            {/* <GraphChartApex /> */}
            <GraphChartV2 />
          </Col>
        </Row>
      ) : (
        <Row gutter={[12, 6]}>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Row gutter={[6, 12]}>
              <Col xs={24} sm={24} md={24}>
                <Link to={"/employee/employee-list"}>
                  <Card className="bg-[#ffa500] text-white card-hover-employee">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px", // Ensures padding is applied to the card content
                        position: "relative",
                      }}
                    >
                      <div>
                        <Typography.Title style={{ color: "white" }} level={4}>
                          Total Employee
                        </Typography.Title>
                        <p
                          style={{
                            textAlign: "center",
                            fontSize: "22px",
                            fontWeight: "bold",
                            marginTop: "4px",
                          }}
                        >
                          {data?.data?.total_employee || 0}
                        </p>
                      </div>
                      <div>
                        <div
                          className="bg-[#ffc14d]"
                          style={{
                            height: "80px",
                            width: "80px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                          }}
                        >
                          <LuUsers2 size={52} />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <style>
                    {`
    .card-hover-employee {
      position: relative;
      overflow: hidden;
      border-radius: 15px; /* More rounded corners */
      transition: transform 0.3s ease, background-color 0.3s ease; /* Smooth zoom-in/out and background transition */
    }

    .card-hover-employee:hover {
      transform: scale(1.05);  /* Slight zoom-in effect */
      background-color: #e68900;  /* Slight background color change */
    }

    .card-hover-employee::before {
      content: "";
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 10px;
      border: 2px solid rgba(255, 255, 255, 0.1); /* Subtle inner border */
      border-radius: 15px; /* Matching rounded corners */
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;  /* Prevent interaction with inner border */
    }

    .card-hover-employee:hover::before {
      opacity: 0;  /* Fade in the inner border */
    }
  `}
                  </style>
                </Link>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Link to={"/employee/distributed"}>
                  <Card className="bg-[#8dc73f] text-white h-full card-hover-disbursements">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px", // Ensures consistent padding
                        position: "relative",
                      }}
                    >
                      <div>
                        <Typography.Title style={{ color: "white" }} level={4}>
                          Total Disbursements
                        </Typography.Title>
                        <p
                          style={{
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: "bold",
                            marginTop: "4px",
                          }}
                        >
                          {empData?.data?.total_assign_count || 0}
                        </p>
                      </div>
                      <div>
                        <div
                          className="bg-[#acd775]"
                          style={{
                            height: "80px",
                            width: "80px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                          }}
                        >
                          <MdOutlineAssignmentTurnedIn size={52} />
                        </div>
                      </div>
                    </div>

                    <style>
                      {`
      .card-hover-disbursements {
        position: relative;
        overflow: hidden;
        border-radius: 15px; /* Rounded corners */
        transition: transform 0.3s ease, background-color 0.3s ease; /* Smooth hover transitions */
      }

      .card-hover-disbursements:hover {
        transform: scale(1.05); /* Zoom-in effect */
        background-color: #72b92b; /* Subtle background color change */
      }

      .card-hover-disbursements::before {
        content: "";
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        border: 2px solid rgba(255, 255, 255, 0.1); /* Subtle inner border */
        border-radius: 15px; /* Matching rounded corners */
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none; /* Prevent interaction */
      }

      .card-hover-disbursements:hover::before {
        opacity: 0; /* Fade-in inner border on hover */
      }
    `}
                    </style>
                  </Card>

                </Link>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={16}>
            <BloodTypeChart />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Row>
              <Col xs={24} sm={24} md={24}>
                <Card className="bg-[#1775bb] text-white py-8 h-full">
                  <Row gutter={[12, 6]}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div className="flex ">
                          <div className="text-lg md:text-xl font-bold">
                            <p className="mb-2">Employee ID</p>
                            <p className="mb-2">Designation</p>
                            <p className="mb-2">Department</p>
                            <p className="mb-3">Joining Date</p>
                          </div>
                          <div className="text-lg md:text-xl ml-4">
                            <p className="mb-2">: {employee_id}</p>
                            <p className="mb-2">: {designation}</p>
                            <p className="mb-2">: {department}</p>
                            <p className="mb-3">
                              : {dayjs(joining_date).format("DD-MM-YYYY")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div className="flex ">
                          <div className="text-lg md:text-xl font-bold">
                            <p className="mb-2">Phone</p>
                            <p className="mb-2">Email</p>
                            <p className="mb-2">Unit Name</p>
                            <p className="mb-3">Status</p>
                          </div>
                          <div className="text-lg md:text-xl ml-4">
                            <p className="mb-2">: {contact_no}</p>
                            <p className="mb-2">: {email}</p>
                            <p className="mb-2">: {unit_name}</p>
                            <p className="mb-3">
                              : {status === 1 ? "Active" : "Inactive"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default DashboardCards;
