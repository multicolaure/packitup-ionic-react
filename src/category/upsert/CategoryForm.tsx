import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { IconPickerModal } from "../../ui/icon/picker/IconPickerModal";
import LoadableButton from "../../ui/loading/LoadableButton";
import { Category, CategorySchema } from "../category";
import { useEffect } from "react";
import { useForm, Controller, FieldError } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import FormRow from "../../ui/form/FormRow";
import Input from "../../ui/form/Input";
import { ZodIssueCode } from "zod";


type CategoryFormProps = {
    category?: Category,
    onSave?: (category: Category) => void,
    saving?: boolean,
    errorMessage?: string,
}

const nameErrorMessage = (fieldError?: FieldError): string | undefined => {
    if (!fieldError) {
        return undefined;
    }
    switch (fieldError.type) {
        case ZodIssueCode.too_small:
            return 'The name is required';
        default:
            return 'The name is invalid';
    }
}


const emptyForm = {
    icon: undefined,
    name: ''
}

export default function CategoryForm(props: CategoryFormProps) {


    const { control, handleSubmit, reset, formState, setError } = useForm<Category>({
        defaultValues: props.category ?? emptyForm,
        resolver: zodResolver(CategorySchema),
        mode: "onTouched"
    });

    useEffect(() => {
        reset(props.category ?? emptyForm);
    }, [props.category, reset]);

    useEffect(() => {
        setError('root', {
            type: 'server',
            message: props.errorMessage
        });
    }, [props.errorMessage, setError]);


    const onSave = (category: Category) => {
        props.onSave?.(category);
    }

    return (
        <form onSubmit={handleSubmit(onSave)}>
            <IonGrid style={{maxWidth: '450px'}}>
                <FormRow>
                    <Controller
                        name="icon"
                        control={control}
                        render={({field}) => <IconPickerModal 
                        icon={field.value}
                        onChange={field.onChange}
                        label="Icon *"
                        title="Choose the category icon"></IconPickerModal>}
                    />
                </FormRow>
                <FormRow>
                    <Input label="Name *"
                        clearInput
                        name="name"
                        control={control}
                        errorMessageProvider={nameErrorMessage}></Input>
                </FormRow>
                {formState.errors?.root && <IonRow><IonText color="danger" class="ion-padding">{formState.errors?.root?.message}</IonText></IonRow> }
                <IonRow>
                    <IonCol class="piu-content-end">
                        <LoadableButton type="submit" disabled={!formState.isValid} loading={props.saving} >Save</LoadableButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </form>
    );
}
