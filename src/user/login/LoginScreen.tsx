import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonPage } from '@ionic/react';
import LoginForm from './LoginForm';

const LoginScreen: React.FC = () => {

    return (
        <IonPage>
            <IonContent fullscreen color="light">
                <main className="piu-middle" >
                    <IonCard className="form">
                        <IonCardHeader color="primary">
                            <IonCardTitle class="">Pack it up!</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div className="ion-padding">
                                <LoginForm/>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </main>
            </IonContent>
        </IonPage>
    );
};

export default LoginScreen;
