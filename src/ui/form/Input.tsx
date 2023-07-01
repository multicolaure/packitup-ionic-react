import { IonInput } from "@ionic/react";
import { ComponentProps } from "react";
import { FieldError, UseControllerProps, Path, FieldValues, Controller } from "react-hook-form"

type BaseInputProps = ComponentProps<typeof IonInput>;

function BaseInput(props: BaseInputProps) {
    return (<IonInput
        {...props}
        fill="solid" labelPlacement="floating"
        debounce={props.debounce ?? 200}
    >
    </IonInput>);
}

type InputProps<TFieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>> = {
    name?: UseControllerProps<TFieldValues, TName>['name'],
    control?: UseControllerProps<TFieldValues, TName>['control'],
    errorMessageProvider?: (error?: FieldError) => string | undefined
} & BaseInputProps;

export default function Input<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>(
    props: InputProps<TFieldValues, TName>) {

    return props.name && props.control ? (<Controller
        name={props.name}
        control={props.control}
        render={({field, fieldState: { invalid, isTouched, error }}) => (
            <BaseInput
                {...props}
                value={field.value}
                onIonInput={event => field.onChange(event.detail.value ?? '')}
                onBlur={field.onBlur}
                className={`${invalid ? 'ion-invalid' : 'ion-valid'} ${isTouched && 'ion-touched'} ${props.className}`}
                errorText={props.errorMessageProvider?.(error) ?? error?.message}
            >
            </BaseInput>
    )}
    />) : <BaseInput {...props} />


}