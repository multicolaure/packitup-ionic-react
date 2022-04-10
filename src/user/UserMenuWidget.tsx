import { IonAvatar, IonItem, IonLabel } from '@ionic/react';
import { User } from '../user/user';

export type UserMenuWidgetProps = {
    user?: User
}

export default function UserMenuWidget(props: UserMenuWidgetProps) {

    const text = props.user ? (props.user.username ?? 'Beautiful unknown') : 'You are not logged in!';
    const photoUrl = props.user?.photoUrl ?? require('../assets/navigation/profile-user.png');

    return (
        <IonItem>
            <IonAvatar slot="start">
                <img src={photoUrl} alt={text}/>
            </IonAvatar>
            <IonLabel>{text}</IonLabel>
        </IonItem>
    );
};
