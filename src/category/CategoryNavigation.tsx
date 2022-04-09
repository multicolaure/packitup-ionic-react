import { Route } from "react-router";
import CategoryListScreen from "./list/CategoryListScreen";


const CategoryNavigation = () => {
    return (
        <Route path="/category" component={CategoryListScreen} exact={true} />
    )
}

export default CategoryNavigation;