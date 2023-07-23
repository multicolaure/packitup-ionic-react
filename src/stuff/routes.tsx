import { Route } from "react-router";
import StuffUpsertScreen from "./upsert/StuffUpsertScreen";


export const getStuffRoutes = () => {
    return [<Route path="/stuff">
                <StuffUpsertScreen />
            </Route>,
            <Route path="/stuff/:id">
                <StuffUpsertScreen />
            </Route>
    ];
}