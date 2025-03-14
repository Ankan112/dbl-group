export interface ITaskList {
  id: number;
  category_title: string;
  category_description: string;
  category_status: number;
  category_created_by: number;
  category_created_at: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  task_status: string;
}
export interface PostTask {
  title: string;
  description?: string;
}
export interface ITaskItems {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  task_code: string;
  task_status: string;
}
export interface ITaskPost {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  is_assign?: number;
  user_id: number;
  task_categories_id: number;
  unit_id?: number;
}
