import { IonCol, IonGrid, IonInput, IonItem, IonRow, IonText } from "@ionic/react";
import { IconPickerModal } from "../../ui/icon/picker/IconPickerModal";
import LoadableButton from "../../ui/loading/LoadableButton";
import { Category, CategorySchema } from "../category";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';


type CategoryFormProps = {
    category?: Category,
    onSave?: (category: Category) => void,
    saving?: boolean,
    errorMessage?: string,
}


export default function CategoryForm(props: CategoryFormProps) {

    const emptyForm = {
        icon: undefined,
        name: ''
    }

    const { control, handleSubmit, reset, formState } = useForm<Category>({
        defaultValues: props.category ?? emptyForm,
        resolver: zodResolver(CategorySchema)
    });

    useEffect(() => {
        reset(props.category ?? emptyForm);
    }, [props.category]);


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
                            render={({field}) => <IconPickerModal 
                            icon={field.value}
                            onChange={field.onChange}
                            label="Icon *"
                            title="Choose the category icon"></IconPickerModal>}
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <Controller
                                name="name"
                                control={control}
                                render={({field}) => <IonInput
                                    label="Name *"
                                    labelPlacement="floating"
                                    debounce={200}
                                    value={field.value}
                                    onIonInput={e => field.onChange(e.detail.value!)}
                                    onBlur={field.onBlur}
                                    clearInput></IonInput>}
                            />
                        </IonItem>
                    </IonCol>
                </IonRow>
                {props.errorMessage && <IonRow><IonText color="danger" class="ion-padding">{props.errorMessage}</IonText></IonRow> }
                <IonRow>
                    <IonCol class="piu-content-end">
                        <LoadableButton type="submit" disabled={!formState.isValid} loading={props.saving} >Save</LoadableButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </form>
    );
}
