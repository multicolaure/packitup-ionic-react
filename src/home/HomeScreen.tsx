import { IonContent, IonHeader, IonPage } from "@ionic/react";
import TopBar from "../navigation/TopBar";

const HomeScreen = () => {
    const title = "Pack it up!";

    return (<IonPage>
      <IonHeader>
        <TopBar title={title}></TopBar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
            <TopBar title={title}></TopBar>
        </IonHeader>
      </IonContent>
    </IonPage>)
};

export default HomeScreen;