import { IonButtons, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";


export type TopBarProps = {
    title?: string,
    subtitle?: string,
}

const TopBar = ({title, subtitle}: TopBarProps) => {

    return (
        <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>
                {title}
                {subtitle && <p><small>{subtitle}</small></p>}
            </IonTitle>
        </IonToolbar>
    )
}

export default TopBar;