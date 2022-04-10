import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect } from "react-router";
import CategoryNavigation from "../category/CategoryNavigation";
import HomeNavigation from "../home/HomeNavigation";
import AppMenu from "./AppMenu";


const AppNavigation = () => {
    
    return (
        <IonReactRouter>
        <IonSplitPane contentId="main">
          <AppMenu />
          <IonRouterOutlet id="main">
            {HomeNavigation()}
            {CategoryNavigation()}
            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    )
};

export default AppNavigation;