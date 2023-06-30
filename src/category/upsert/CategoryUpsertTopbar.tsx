import { IonButtons, IonButton, IonIcon } from "@ionic/react"
import { trash } from "ionicons/icons"
import TopBar from "../../navigation/TopBar"

type CategoryUpsertTopbarProps = {
    title: string,
    onRemove?: () => void,
    hasDeleteRights: boolean
}


export const CategoryUpsertTopbar = ({ title, onRemove, hasDeleteRights }: CategoryUpsertTopbarProps ) => {
    return (
        <TopBar title={title} toBack={true} defaultBackRoute="/categories">
            {hasDeleteRights && 
                <IonButtons slot="end">
                    <IonButton onClick={onRemove}>
                        <IonIcon slot="icon-only" icon={trash}></IonIcon>
                    </IonButton>
                </IonButtons>}
        </TopBar>
    )
}