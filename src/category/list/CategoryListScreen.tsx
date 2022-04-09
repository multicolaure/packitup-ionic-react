import { IonContent, IonHeader, IonPage } from "@ionic/react";
import TopBar from "../../navigation/TopBar";
import CategoryList from "./CategoryList";



const CategoryListScreen = () => {
    const title = "Your categories";

    return (<IonPage>
      <IonHeader>
        <TopBar title={title}></TopBar>
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