// import {
//   DeleteOutlined,
//   OrderedListOutlined,
//   PlusCircleFilled,
//   PlusCircleOutlined,
//   PlusOutlined,
//   StarOutlined,
// } from "@ant-design/icons";
// import { Button, Card, Divider, Flex, Space, Tag, Typography } from "antd";
// import { useDispatch } from "react-redux";
// import { setCommonModal } from "../../../app/slice/modalSlice";
// import TaskForm from "../components/TaskForm";
// import ListForm from "../components/ListForm";
// import dayjs from "dayjs";
// import { IoWatchOutline } from "react-icons/io5";
// import { MdOutlineWatchLater } from "react-icons/md";

// const TaskManager = () => {
//   const dispatch = useDispatch();
//   return (
//     <Card
//       extra={
//         <Space>
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => {
//               dispatch(
//                 setCommonModal({
//                   title: "Create Task",
//                   content: <TaskForm />,
//                   show: true,
//                   width: "550px",
//                 })
//               );
//             }}
//           >
//             Create
//           </Button>
//         </Space>
//       }
//       title="Task Manager"
//     >
//       <Flex>
//         <div className="w-5/6">
//           <Card>
//             <Typography.Title level={4}>Yearly Goal</Typography.Title>
//             <Typography.Text strong style={{ fontSize: "15px" }}>
//               The Final Destination
//             </Typography.Text>{" "}
//             <br />
//             <Typography.Text>This is Description</Typography.Text> <br />
//             <Tag color="warning">
//               <Flex align="center" justify="center">
//                 <MdOutlineWatchLater size={14} style={{ marginRight: "3px" }} />
//                 {dayjs().format("DD MMM YYYY")}
//               </Flex>
//             </Tag>
//           </Card>
//         </div>
//         <div className="w-1/6 ">
//           <Space direction="vertical" style={{ width: "100%" }}>
//             <Button icon={<OrderedListOutlined />} className="w-full">
//               All Tasks
//             </Button>
//             <Button icon={<StarOutlined />} className="w-full">
//               Starrted
//             </Button>
//           </Space>
//           <Divider orientation="center" style={{ margin: "12px 0 8px" }}>
//             Lists
//           </Divider>
//           <Flex align="center" justify="space-between">
//             <Typography.Text style={{ marginLeft: "8px" }}>
//               1. My Tasks
//             </Typography.Text>
//             <DeleteOutlined />
//           </Flex>
//           <Flex align="center" justify="space-between">
//             <Typography.Text style={{ marginLeft: "8px" }}>
//               2. Today Tasks
//             </Typography.Text>
//             <DeleteOutlined />
//           </Flex>
//           <Flex align="center" justify="space-between">
//             <Typography.Text style={{ marginLeft: "8px" }}>
//               3. Yearly Plan
//             </Typography.Text>
//             <DeleteOutlined />
//           </Flex>
//           <Flex align="center" justify="space-between">
//             <Typography.Text style={{ marginLeft: "8px" }}>
//               4. Movie Goals
//             </Typography.Text>
//             <DeleteOutlined />
//           </Flex>
//           <Button
//             icon={<PlusOutlined />}
//             type="text"
//             style={{ padding: "6px ", marginTop: "4px" }}
//             onClick={() => {
//               dispatch(
//                 setCommonModal({
//                   title: "Create New List",
//                   content: <ListForm />,
//                   show: true,
//                   width: "450px",
//                 })
//               );
//             }}
//           >
//             Create new list
//           </Button>
//         </div>
//       </Flex>
//     </Card>
//   );
// };
// export default TaskManager;
import {
  OrderedListOutlined,
  PlusOutlined,
  SearchOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Row, Space } from "antd";
import React, { useState } from "react";
import { setCommonModal } from "../../../app/slice/modalSlice";
import TaskForm from "../components/TaskForm";
import { useDispatch } from "react-redux";
import ListForm from "../components/ListForm";

const TaskManager = () => {
  const [activeList, setActiveList] = useState("My Tasks");
  const dispatch = useDispatch();
  const lists = [
    { id: 1, name: "My Tasks", count: 12 },
    { id: 2, name: "Today Tasks", count: 5 },
    { id: 3, name: "Yearly Plan", count: 8 },
    { id: 4, name: "Movie Goals", count: 15 },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto ">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
              <h1 className="ml-3 text-xl font-bold text-gray-900">
                Task Manager
              </h1>
            </div>
            <div className="flex items-center">
              <div className="mr-4 relative">
                <Input
                  type="text"
                  placeholder="Search tasks..."
                  // className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  prefix={<SearchOutlined />}
                />
              </div>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  dispatch(
                    setCommonModal({
                      title: "Create Task",
                      content: <TaskForm />,
                      show: true,
                      width: "550px",
                    })
                  );
                }}
              >
                Create Task
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}

      <Row gutter={[16, 16]} style={{ padding: 12 }}>
        {/* Main Task View */}
        <Col xs={24} sm={24} md={24} lg={18}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={12}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        Yearly Goal
                      </h2>
                      <div className="mt-1">
                        <span className="text-sm font-medium text-gray-700">
                          The Final
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        This is Description
                      </p>
                    </div>
                    <div>
                      <Button
                        type="text"
                        className=" text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div className="mb-3 mt-1 flex items-center text-sm text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Due: 07 Mar 2025
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    In Progress
                  </span>
                </div>

                {/* <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500">
                        Created by: Alex Johnson
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        Comment
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        Yearly Goal
                      </h2>
                      <div className="mt-1">
                        <span className="text-sm font-medium text-gray-700">
                          The Final
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        This is Description
                      </p>
                    </div>
                    <div>
                      <Button
                        type="text"
                        className=" text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div className="mb-3 mt-1 flex items-center text-sm text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Due: 07 Mar 2025
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    In Progress
                  </span>
                </div>

                {/* <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500">
                        Created by: Alex Johnson
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        Comment
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        Yearly Goal
                      </h2>
                      <div className="mt-1">
                        <span className="text-sm font-medium text-gray-700">
                          The Final
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        This is Description
                      </p>
                    </div>
                    <div>
                      <Button
                        type="text"
                        className=" text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div className="mb-3 mt-1 flex items-center text-sm text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Due: 07 Mar 2025
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    In Progress
                  </span>
                </div>

                {/* <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500">
                        Created by: Alex Johnson
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        Comment
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </Col>
          </Row>
        </Col>

        {/* Right Sidebar */}
        <Col xs={24} sm={24} md={24} lg={6}>
          <div className="w-full h-[84vh] bg-white border-r border-gray-200 rounded-lg flex flex-col">
            <div className="p-4">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Button icon={<OrderedListOutlined />} className="w-full">
                  All Tasks
                </Button>

                <Button icon={<StarOutlined />} className="w-full">
                  Starrted
                </Button>
              </Space>

              <div className="mt-5">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                  Lists
                </h2>
                {lists.map((list) => (
                  <Button
                    key={list.id}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left mb-1 ${
                      activeList === list.name
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveList(list.name)}
                  >
                    <div className="flex items-center">
                      <span className="w-6 text-xs text-gray-500">
                        {list.id}.
                      </span>
                      <span className="font-medium">{list.name}</span>
                    </div>
                    <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      {list.count}
                    </span>
                  </Button>
                ))}

                <Button
                  onClick={() => {
                    dispatch(
                      setCommonModal({
                        title: "Create New List",
                        content: <ListForm />,
                        show: true,
                        width: "450px",
                      })
                    );
                  }}
                  className="w-full flex items-center justify-center px-3 py-2 mt-4 text-gray-700 border border-gray-300 border-dashed rounded-lg hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Create new list
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TaskManager;
