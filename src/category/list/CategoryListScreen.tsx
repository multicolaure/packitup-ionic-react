import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage } from "@ionic/react";
import { add } from 'ionicons/icons';
import TopBar from "../../navigation/TopBar";
import CategoryList from "./CategoryList";



const CategoryListScreen = () => {
    const title = "Your categories";

    const getNewRoute = () => {
      return "/category";
    };

    return (<IonPage>
      <IonHeader>
        <TopBar title={title}>
          <IonButtons slot="end">
            <IonButton routerLink={getNewRoute()}>
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </TopBar>
        
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
            <TopBar title={title}></TopBar>
        </IonHeader>
            <CategoryList></CategoryList>
      </IonContent>
    </IonPage>)
};

export default CategoryListScreen;