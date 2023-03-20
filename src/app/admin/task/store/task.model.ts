import { AssignUser } from "./assign_users.model";

export interface Task{
    _id?:string;
    title: string;
    description: string;
    task_group?:string;
    user?:string;
    project?:string;
    index?: number;
    assign_users?: AssignUser[]
}