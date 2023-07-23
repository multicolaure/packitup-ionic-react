import { IonTextarea } from "@ionic/react";
import { ComponentProps } from "react";
import { FieldError, UseControllerProps, Path, FieldValues, Controller } from "react-hook-form"

type BaseTextareaProps = ComponentProps<typeof IonTextarea>;

function BaseTextarea(props: BaseTextareaProps) {
    return (<IonTextarea
        {...props}
        fill="solid" labelPlacement="floating"
        debounce={props.debounce ?? 200}
    >
    </IonTextarea>);
}

type TextareaProps<TFieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>> = {
    name?: UseControllerProps<TFieldValues, TName>['name'],
    control?: UseControllerProps<TFieldValues, TName>['control'],
    errorMessageProvider?: (error?: FieldError) => string | undefined
} & BaseTextareaProps;

export default function Textarea<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>(
    props: TextareaProps<TFieldValues, TName>) {

    return props.name && props.control ? (<Controller
        name={props.name}
        control={props.control}
        render={({field, fieldState: { invalid, isTouched, error }}) => (
            <BaseTextarea
                {...props}
                value={field.value}
                onIonInput={event => field.onChange(event.detail.value ?? '')}
                onBlur={field.onBlur}
                className={`${invalid ? 'ion-invalid' : 'ion-valid'} ${isTouched && 'ion-touched'} ${props.className}`}
                errorText={props.errorMessageProvider?.(error) ?? error?.message}
            >
            </BaseTextarea>
    )}
    />) : <BaseTextarea {...props} />


}