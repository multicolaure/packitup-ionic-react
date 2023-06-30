import { IonInput } from "@ionic/react";
import { ComponentProps } from "react";
import { FieldError, UseControllerProps, useController, Path, FieldValues } from "react-hook-form"

type InputProps<TFieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>> = {
    name: UseControllerProps<TFieldValues, TName>['name'],
    control?: UseControllerProps<TFieldValues, TName>['control'], 
    errorMessageProvider?: (error?: FieldError) => string | undefined
} & ComponentProps<typeof IonInput>;

export default function Input<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>(props: InputProps<TFieldValues, TName>) {

    const {
        field,
        fieldState: { invalid, isTouched, error },
    } = useController<TFieldValues, TName>({
        control: props.control, 
        name: props.name
    });

    return (
        <IonInput
            {...props}
            fill="solid" labelPlacement="floating"
            value={field.value}
            debounce={props.debounce ?? 200}
            onIonInput={event => field.onChange(event.detail.value ?? '')}
            onBlur={field.onBlur}
            className={`${invalid ? 'ion-invalid' : 'ion-valid'} ${isTouched && 'ion-touched'} ${props.className}`}
            errorText={props.errorMessageProvider?.(error) ?? error?.message}
            >
            </IonInput>
    )
}