import { IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonText } from '@ionic/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadableButton from '../../ui/loading/LoadableButton';
import { login, selectError, selectLoading, selectProvider } from '../user.slice';
import { LoginError } from './login.service';


const toErrorMessage = (error?: LoginError): string | undefined => {
    switch (error) {
        case LoginError.BAD_USERNAME:
            return 'Invalid username';
        case LoginError.WRONG_PASSWORD:
            return 'Invalid password';
        case LoginError.USER_NOT_FOUND:
            return 'You don\'t have an account here';
        case LoginError.OTHER:
            return 'Hum, something went wrong, try again!';
        default:
            return;
    }

}

const LoginForm = () => {

    const [username, setUsername] = useState('laure8973@hotmail.fr');
    const [password, setPassword] = useState('123456');

    const isFormValid = (!!username.trim() && !!password);
    const errorMessage = toErrorMessage(useSelector(selectError));
    const loading = useSelector(selectLoading);
    const provider = useSelector(selectProvider);

    const dispatch = useDispatch();

    const submit = () => {
        if (isFormValid) {
            dispatch(login({ username, password }));
        }
    };

    return (
        <form>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Username</IonLabel>
                            <IonInput value={username} onIonChange={event => setUsername(event.detail.value ?? '')}
                                autocomplete="email" autofocus={true}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput value={password} onIonChange={event => setPassword(event.detail.value ?? '')}
                                type="password" autocomplete="current-password"></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                {errorMessage && <IonRow><IonText color="danger" class="ion-padding">{errorMessage}</IonText></IonRow> }
                <IonRow>
                    <IonCol class="piu-content-end">
                        <LoadableButton onClick={() => submit()} loading={loading && provider === 'Manual'}>Sign in</LoadableButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </form>
    );
};

export default LoginForm;
