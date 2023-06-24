import { Route } from "react-router";
import HomeScreen from "./HomeScreen";


const HomeNavigation = () => {
    return (
        <Route path="/home" exact>
            <HomeScreen/>
        </Route>
    )
}

export default HomeNavigation;