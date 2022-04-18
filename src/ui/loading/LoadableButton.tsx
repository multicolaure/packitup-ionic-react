import { IonButton, IonSpinner } from "@ionic/react";
import { ReactNode } from "react";

export type LoadableButtonProps  = {
    loading?: boolean,
    children?: ReactNode,
} & Parameters<typeof IonButton>[0]


const LoadableButton = ({ loading, children, ...otherProps }: LoadableButtonProps) => {

    return (
        <IonButton {...otherProps} disabled={loading}>
            {loading && <IonSpinner slot="start" class="spin ion-margin-end"></IonSpinner>}
            {children}
        </IonButton>
    )
};

export default LoadableButton;