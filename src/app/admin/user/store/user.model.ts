export interface User{
    _id?: string;
    name: string;
    email:string;
    roles?: [string];
    role?: string;
    createdBy?: string;
}