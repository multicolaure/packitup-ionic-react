import { IonBackButton, IonButtons, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import { ReactNode } from "react";

export type TopBarProps = {
    title?: string,
    subtitle?: string,
    toBack?: boolean,
    defaultBackRoute?: string,
    children?: ReactNode
}

const TopBar = ({title, subtitle, toBack, defaultBackRoute, children}: TopBarProps) => {

    return (
        <IonToolbar color="primary">
            <IonButtons slot="start">
              {toBack ? <IonBackButton defaultHref={defaultBackRoute}></IonBackButton> : <IonMenuButton></IonMenuButton>}
            </IonButtons>
            <IonTitle>
                {title}
                {subtitle && <p><small>{subtitle}</small></p>}
            </IonTitle>
            {children}
        </IonToolbar>
    )
}

export default TopBar;