import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect } from "react-router";
import { getCategoryRoutes } from "../category/routes";
import { getHomeRoutes } from "../home/routes";
import { getStuffRoutes } from "../stuff/routes";
import AppMenu from "./AppMenu";


const AppNavigation = () => {

  const routes = [
    ...getHomeRoutes(),
    ...getCategoryRoutes(),
    ...getStuffRoutes(),
    <Redirect exact from="/" to="/home" />
  ]
    
    return (
        <IonReactRouter>
        <IonSplitPane contentId="main">
          <AppMenu />
          <IonRouterOutlet id="main" children={routes}></IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    )
};

export default AppNavigation;