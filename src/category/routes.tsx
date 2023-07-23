import { Route } from "react-router";
import CategoryListScreen from "./list/CategoryListScreen";
import CategoryUpsertScreen from "./upsert/CategoryUpsertScreen";


export const getCategoryRoutes = () => {
    return [<Route path="/category">
                <CategoryUpsertScreen />
            </Route>,
            <Route path="/category/:id">
                <CategoryUpsertScreen />
            </Route>,
            <Route path="/categories" exact={true}>
                <CategoryListScreen />
            </Route>
    ]
}
