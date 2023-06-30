import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import LoginForm from './LoginForm';
import image from '../../assets/images/undraw_roadtrip.svg';

const LoginScreen: React.FC = () => {

    return (
        <IonPage>
            <IonContent fullscreen>

                <main className="piu-middle">
                    <IonGrid className="piu-middle">
                        <IonRow>
                            <IonCol size="12" size-md="6">
                                <img src={image} style={{maxWidth: '100%', maxHeight: '100%'}} aria-label="People travelling during a roadtrip"/>
                            </IonCol>
                            <IonCol size="12" size-md="6">
                                <div className="ion-padding">
                                    <LoginForm />
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </main>
            </IonContent>
        </IonPage>
    );
};

export default LoginScreen;
