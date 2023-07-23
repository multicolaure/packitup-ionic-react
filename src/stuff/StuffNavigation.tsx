import { Route } from "react-router";
import StuffUpsertScreen from "./upsert/StuffUpsertScreen";


const StuffNavigation = () => {
    return (
        <>
            <Route path="/stuff">
                <StuffUpsertScreen />
            </Route>
            <Route path="/stuff/:id">
                <StuffUpsertScreen />
            </Route>
        </>
    )
}

export default StuffNavigation;