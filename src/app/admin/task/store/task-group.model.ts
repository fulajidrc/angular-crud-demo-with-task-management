import { Task } from "./task.model";

export interface TaskGroup{
    _id?: string;
    title: string;
    description: string;
    tasks: Task[],
    index:number,
    project?:string,
    user?:string
}