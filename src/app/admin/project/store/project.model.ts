import { TaskGroup } from "../../task/store/task-group.model";

export interface Project{
    _id?: string;
    title: string;
    description: string;
    user?:string;
    task_groups?:TaskGroup[]
}