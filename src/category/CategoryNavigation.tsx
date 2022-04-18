import { Route } from "react-router";
import CategoryListScreen from "./list/CategoryListScreen";
import CategoryUpsertScreen from "./upsert/CategoryUpsertScreen";


const CategoryNavigation = () => {
    return (
        <>
            <Route path="/category/:id" component={CategoryUpsertScreen} />
            <Route path="/categories" component={CategoryListScreen} exact={true} />
        </>
    )
}

export default CategoryNavigation;