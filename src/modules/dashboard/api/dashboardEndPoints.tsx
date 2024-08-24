import { api } from "../../../app/api/api";
import { HTTPResponse } from "../../../app/types/commonTypes";

export const dashboardEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllDashboard: build.query<HTTPResponse<any>, void>({
      query: () => ({
        url: `/dashboard/dashboard-data`,
      }),
      providesTags: () => [{ type: "dashboardTypes", id: "dashboard" }],
    }),
    getDashboardGraphData: build.query<HTTPResponse<any>, any>({
      query: (params) => ({
        url: `/dashboard/dashboard-graph-data`,
        params,
      }),
      providesTags: () => [{ type: "dashboardTypes", id: "dashboard" }],
    }),
  }),
});

export const { useGetAllDashboardQuery, useGetDashboardGraphDataQuery } =
  dashboardEndpoints;