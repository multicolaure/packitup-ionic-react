import { IonRow, IonCol } from "@ionic/react"
import { ReactNode } from "react"

type FormRowProps = {
    children: ReactNode,
}

export default function FormRow({children}: FormRowProps) {
    return (
        <IonRow class="ion-padding-bottom">
            <IonCol>{children}</IonCol>
        </IonRow>
    )
}