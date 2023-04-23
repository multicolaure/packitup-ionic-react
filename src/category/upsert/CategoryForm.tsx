import { IonCol, IonGrid, IonInput, IonItem, IonLabel, IonNote, IonRow, IonText } from "@ionic/react";
import { IconPickerModal } from "../../ui/icon/picker/IconPickerModal";
import LoadableButton from "../../ui/loading/LoadableButton";
import { Category, CategorySchema } from "../category";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from "react-hook-form";


type CategoryFormProps = {
    category?: Category,
    onSave?: (category: Category) => void,
    saving?: boolean,
    errorMessage?: string,
}


export default function CategoryForm(props: CategoryFormProps) {

    const { control, handleSubmit, formState } = useForm<Category>({
        values: props.category,
        defaultValues: {
            name: ''
        },
        resolver: zodResolver(CategorySchema)
    });

    const onSave = (category: Category) => {
        props.onSave?.(category);
    }

    return (
        <form onSubmit={handleSubmit(onSave)}>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <Controller
                            name="icon"
                            control={control}
                            render={({ field }) => <IconPickerModal icon={field.value} onChange={field.onChange} label="Icon *"
                            title="Choose the category icon"></IconPickerModal>}
                        ></Controller>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {<Controller
                            name="name"
                            control={control}
                            render={({ field }) => (<IonItem>
                            <IonLabel position="floating">Name *</IonLabel>
                            <IonInput value={field.value}
                                debounce={200}
                                onIonChange={e => field.onChange(e.detail.value)}
                                onIonBlur={field.onBlur}
                                clearInput></IonInput>
                            </IonItem>)}
                        ></Controller>}
                    </IonCol>
                </IonRow>
                {props.errorMessage && <IonRow><IonText color="danger" class="ion-padding">{props.errorMessage}</IonText></IonRow> }
                <IonRow>
                    <IonCol class="piu-content-end">
                        <LoadableButton type="submit" loading={props.saving} disabled={!formState.isValid}>Save</LoadableButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </form>
    );
}
