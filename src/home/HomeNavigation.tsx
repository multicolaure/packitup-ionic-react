import { Route } from "react-router";
import HomeScreen from "./HomeScreen";


const HomeNavigation = () => {
    return (
        <Route path="/home" component={HomeScreen} exact={true} />
    )
}

export default HomeNavigation;