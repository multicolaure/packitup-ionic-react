import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonNote, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import Icon from "../Icon";
import { IconName } from "../icon";
import { IconPickerList } from "./IconPickerList";
import { iconsList } from "./picker-icons-list";

export type IconPickerModalProps = {
    icon?: IconName,
    onChange?: (icon: IconName) => void,
    label?: string,
    title?: string,   
}

export function IconPickerModal(props: IconPickerModalProps) {

    const [visible, setVisible] = useState(false);
    const [currentIcon, setCurrentIcon] = useState<IconName>(props.icon ?? '');

    
    const selectIcon = (icon: string) => {
        setCurrentIcon(icon);
        setVisible(false);
        if (props.onChange) {
            props.onChange(icon);
        }
    }

    return (
        <>
            <IonItem button lines="full" fill="solid"
                onClick={() => setVisible(true)}>
                <IonLabel>{props.label ?? "Choose your icon"}</IonLabel>
                {currentIcon && 
                    <IonNote slot="start">
                        <Icon name={currentIcon}></Icon>
                    </IonNote>}
            </IonItem>
            <IonModal
                isOpen={visible}
            >
                <IonHeader translucent>
                    <IonToolbar>
                        <IonTitle>{props.title ?? "Choose your icon"}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setVisible(false)}><Icon name="close"></Icon></IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent><IconPickerList icons={iconsList} onClickIcon={selectIcon}></IconPickerList></IonContent>
            </IonModal>
        </>
    )
}