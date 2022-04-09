import { Secured } from "../user/user";

export type CategoryIcon = string;

export interface Category extends Secured {
    id?: string,
    name: string,
    icon: CategoryIcon,
    order?: number,
}