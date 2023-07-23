import { homeMenuItems } from '../home/navigation';
import { categoriesMenuItems } from '../category/navigation';
import { stuffMenuItems } from '../stuff/navigation';

export const menuItems = [
    ...homeMenuItems,
    ...categoriesMenuItems,
    ...stuffMenuItems
]