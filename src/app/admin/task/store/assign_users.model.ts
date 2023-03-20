import { User } from "src/app/auth/store/auth.model";

export interface AssignUser{
    _id?: string;
    task?: string;
    project?:string,
    assign_user?:User | string
}