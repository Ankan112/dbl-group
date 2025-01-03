export interface IAssignCategoryList {
  user_id: number;
  employee_id: string;
  name: string;
  email: string;
  asset_unit_titles: string;
  ticket_category_titles: string;
  assign_category: IAssignCategory[];
}
export interface IAssignCategory {
  category_id: number;
  category_name: string;
  access_id: number;
}
