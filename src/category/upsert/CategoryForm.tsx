import { IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonText } from "@ionic/react";
import { useState } from "react";
import { IconPickerModal } from "../../ui/icon/picker/IconPickerModal";
import LoadableButton from "../../ui/loading/LoadableButton";
import { Category } from "../category";


type CategoryFormProps = {
    category?: Category,
    onSave?: (category: Category) => void,
    saving?: boolean,
    errorMessage?: string,
}


export default function CategoryForm(props: CategoryFormProps) {

    const [name, setName] = useState(props.category?.name ?? '');
    const [icon, setIcon] = useState(props.category?.icon ?? '');

    const getCategory = () => {
        return {
            id: props.category?.id,
            name,
            icon,
        }
    }


    const onSave = () => {
        props.onSave?.(getCategory());
    }

    return (
        <form>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IconPickerModal icon={icon} onChange={setIcon} label="Icon *"
                            title="Choose the category icon"></IconPickerModal>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Name *</IonLabel>
                            <IonInput value={name}
                                debounce={200}
                                onIonChange={e => setName(e.detail.value!)}
                                clearInput></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                {props.errorMessage && <IonRow><IonText color="danger" class="ion-padding">{props.errorMessage}</IonText></IonRow> }
                <IonRow>
                    <IonCol class="piu-content-end">
                        <LoadableButton loading={props.saving} onClick={onSave}>Save</LoadableButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </form>
    );
}
