import { Navigate, createBrowserRouter } from "react-router-dom";
import ForgotPassword from "./auth/pages/ForgotPassword";
import { Login } from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import ResetPassword from "./auth/pages/ResetPassword";
import SendOtp from "./auth/pages/SendOtp";
import { AppLayout } from "./components/appLayout/AppLayout";
import ProfileSection from "./components/navBar/ProfileSection";
import NotFound from "./components/notFound/NotFound";
import UnauthorizePage from "./components/notFound/UnauthorizePage";
import About from "./modules/about/page/About";
import AdminList from "./modules/admin/pages/Adminlist";
import AssetsList from "./modules/assets/pages/AssetsList";
import DistributedAsset from "./modules/assets/pages/DistributedAsset";
import EmployeeDistributedAsset from "./modules/assets/pages/EmployeeDistributedAsset";
import CTCList from "./modules/ctc/pages/CTCLIst";
import DashboardCards from "./modules/dashboard/Pages/DashboardCards";
import EmployeeList from "./modules/employee/pages/Employeelist";
import EmployeeListForEmployeePanel from "./modules/employee/pages/EmployeeListForEmployeePanel";
import Forms from "./modules/forms/page/Forms";
import LicenseList from "./modules/Licenses/pages/LicenseList";
import PageEight from "./modules/sop/page/pageEight";
import PageEleven from "./modules/sop/page/pageEleven";
import PageFifteen from "./modules/sop/page/pageFifteen";
import PageFive from "./modules/sop/page/pageFive";
import PageFour from "./modules/sop/page/pageFour";
import PageFourteen from "./modules/sop/page/pageFourteen";
import PageNine from "./modules/sop/page/pageNine";
import PageOne from "./modules/sop/page/pageOne";
import PageSeven from "./modules/sop/page/pageSeven";
import PageSeventeen from "./modules/sop/page/pageSeventeen";
import PageSix from "./modules/sop/page/pageSix";
import PageSixteen from "./modules/sop/page/pageSixteen";
import PageTen from "./modules/sop/page/pageTen";
import PageThirteen from "./modules/sop/page/pageThirteen";
import PageThree from "./modules/sop/page/pageThree";
import PageTwelve from "./modules/sop/page/pageTwelve";
import PageTwo from "./modules/sop/page/pageTwo";
import UnitList from "./modules/Unit/pages/UnitList";
import ProtectedRoute from "./utils/ProtectRoute";
import RequireUser from "./utils/requireUser";

export const routers = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  {
    path: "/login",
    element: <ProtectedRoute children={<Login />} />,
  },
  {
    path: "/register",
    element: <ProtectedRoute children={<Register />} />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizePage />,
  },
  {
    path: "/forget-password",
    element: <ProtectedRoute children={<ForgotPassword />} />,
  },
  {
    path: "forget-password/otp",
    element: <ProtectedRoute children={<SendOtp />} />,
  },
  {
    path: "/reset-password",

    element: <ProtectedRoute children={<ResetPassword />} />,
  },
  {
    path: "/dashboard",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/",
    // element: <AppLayout />,
    element: <RequireUser children={<AppLayout />} />,
    children: [
      {
        path: "/",
        // element: <RequireUser children={<DashboardDemo />} />,
        element: <DashboardCards />,
      },
      {
        path: "/setting/profile",
        element: <ProfileSection />,
      },
      {
        path: "/assets/list",
        element: <AssetsList />,
      },
      {
        path: "/assets/distributed",
        element: <DistributedAsset />,
      },
      {
        path: "/employee/distributed",
        element: <EmployeeDistributedAsset />,
      },
      {
        path: "/employee/list",
        element: <EmployeeList />,
      },
      {
        path: "/employee/employee-list",
        element: <EmployeeListForEmployeePanel />,
      },
      {
        path: "/admin/list",
        element: <AdminList />,
      },
      {
        path: "/ctc/list",
        element: <CTCList />,
      },
      {
        path: "/forms",
        element: <Forms />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "sop",
        children: [
          {
            path: "one",
            element: <PageOne />,
          },
          {
            path: "two",
            element: <PageTwo />,
          },
          {
            path: "three",
            element: <PageThree />,
          },
          {
            path: "four",
            element: <PageFour />,
          },
          {
            path: "five",
            element: <PageFive />,
          },
          {
            path: "six",
            element: <PageSix />,
          },
          {
            path: "seven",
            element: <PageSeven />,
          },
          {
            path: "eight",
            element: <PageEight />,
          },
          {
            path: "nine",
            element: <PageNine />,
          },
          {
            path: "ten",
            element: <PageTen />,
          },
          {
            path: "eleven",
            element: <PageEleven />,
          },
          {
            path: "twelve",
            element: <PageTwelve />,
          },
          {
            path: "thirteen",
            element: <PageThirteen />,
          },
          {
            path: "fourteen",
            element: <PageFourteen />,
          },
          {
            path: "fifteen",
            element: <PageFifteen />,
          },
          {
            path: "sixteen",
            element: <PageSixteen />,
          },
          {
            path: "seventeen",
            element: <PageSeventeen />,
          },
        ],
      },
      {
        path: "settings",
        children: [
          {
            path: "unit",
            element: <UnitList />,
          },
          {
            path: "license",
            element: <LicenseList />,
          },
        ],
      },
    ],
  },
]);
