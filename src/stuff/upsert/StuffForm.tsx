import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import LoadableButton from "../../ui/loading/LoadableButton";
import { useEffect } from "react";
import { useForm, Controller, FieldError } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import FormRow from "../../ui/form/FormRow";
import Input from "../../ui/form/Input";
import { ZodIssueCode } from "zod";
import { FrequencyUnit, Stuff, StuffSchema } from "../stuff";
import FrequencyPicker from "./FrequencyPicker";
import Textarea from "../../ui/form/Textarea";
import CategoryIdSelect from "../../category/select/CategoryIdSelect";


type StuffFormProps = {
    stuff?: Stuff,
    onSave?: (stuff: Stuff) => void,
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
    name: '',
    notes: '',
    frequency: {
        nbStuffs: 1,
        frequency: 1,
        unit: FrequencyUnit.trip
    },
    categoryIds: [],
    categoryId: undefined
}

export default function StuffForm(props: StuffFormProps) {

    
    const { control, handleSubmit, reset, formState, setError } = useForm<Stuff>({
        defaultValues: props.stuff ?? emptyForm,
        resolver: zodResolver(StuffSchema),
        mode: "onTouched"
    });

    useEffect(() => {
        reset(props.stuff ?? emptyForm);
    }, [props.stuff, reset]);

    useEffect(() => {
        setError('root', {
            type: 'server',
            message: props.errorMessage
        });
    }, [props.errorMessage, setError]);


    const onSave = (stuff: Stuff) => {
        props.onSave?.(stuff);
    }

    return (
        <form onSubmit={handleSubmit(onSave)}>
            <IonGrid style={{maxWidth: '450px'}}>
                <FormRow>
                    <Input label="Name *"
                        clearInput
                        name="name"
                        control={control}
                        errorMessageProvider={nameErrorMessage}></Input>
                </FormRow>
                <FormRow>
                    <Controller
                        name="frequency"
                        control={control}
                        render={({field}) => <FrequencyPicker 
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}></FrequencyPicker>}
                    />
                </FormRow>
                <FormRow>
                    <Textarea label="Notes"
                        name="notes"
                        control={control}
                    ></Textarea>
                </FormRow>
                <FormRow>
                    <CategoryIdSelect label="Select categories" 
                        name="categoryIds" 
                        control={control}
                        multiple={true}></CategoryIdSelect>
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
