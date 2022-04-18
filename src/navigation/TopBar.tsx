import { IonBackButton, IonButtons, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";

export type TopBarProps = {
    title?: string,
    subtitle?: string,
    toBack?: boolean,
    defaultBackRoute?: string,
}

const TopBar = ({title, subtitle, toBack, defaultBackRoute}: TopBarProps) => {

    return (
        <IonToolbar color="primary">
            <IonButtons slot="start">
              {toBack ? <IonBackButton defaultHref={defaultBackRoute}></IonBackButton> : <IonMenuButton></IonMenuButton>}
            </IonButtons>
            <IonTitle>
                {title}
                {subtitle && <p><small>{subtitle}</small></p>}
            </IonTitle>
        </IonToolbar>
    )
}

export default TopBar;