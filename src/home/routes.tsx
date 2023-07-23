import { Route } from "react-router";
import HomeScreen from "./HomeScreen";


export const getHomeRoutes = () => {
    return [
        <Route path="/home" exact>
            <HomeScreen></HomeScreen>
        </Route>
    ]
}