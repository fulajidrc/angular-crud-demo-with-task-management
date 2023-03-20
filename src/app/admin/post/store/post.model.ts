import { Category } from "../../category/store/category.model";

export interface Post{
    _id?: string;
    title: string;
    description:string;
    category:string | Category;
}