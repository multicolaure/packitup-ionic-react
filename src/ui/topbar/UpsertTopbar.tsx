import { IonButtons, IonButton, IonIcon } from "@ionic/react"
import { trash } from "ionicons/icons"
import TopBar from "../../navigation/TopBar"

type UpsertTopbarProps = {
    title: string,
    onRemove?: () => void,
    hasDeleteRights: boolean,
    defaultBackRoute: string,
}


export const UpsertTopbar = ({ title, onRemove, hasDeleteRights, defaultBackRoute }: UpsertTopbarProps ) => {
    return (
        <TopBar title={title} toBack={true} defaultBackRoute={defaultBackRoute}>
            {hasDeleteRights && 
                <IonButtons slot="end">
                    <IonButton onClick={onRemove}>
                        <IonIcon slot="icon-only" icon={trash}></IonIcon>
                    </IonButton>
                </IonButtons>}
        </TopBar>
    )
}