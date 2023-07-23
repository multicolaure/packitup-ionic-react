import { IonSelect } from "@ionic/react";
import { ComponentProps } from "react";
import { UseControllerProps, Path, FieldValues, Controller } from "react-hook-form"

type BaseSelectProps = ComponentProps<typeof IonSelect>;

function BaseSelect(props: BaseSelectProps) {
    return (<IonSelect
        {...props}
        fill="solid" labelPlacement="floating"
        label={props.label ?? ''}
        interface={props.interface ?? 'popover'}
    >
        {props.children}
    </IonSelect>);
}

export type SelectProps<TFieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>> = {
    name: UseControllerProps<TFieldValues, TName>['name'],
    control?: UseControllerProps<TFieldValues, TName>['control'],
    loading?: boolean,
} & BaseSelectProps;

export default function Select<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>(
    props: SelectProps<TFieldValues, TName>) {

    if(props.loading) {
        return <BaseSelect {...props} disabled={true} label="Loading..."/>
    }

    return props.name && props.control ? (<Controller
        name={props.name}
        control={props.control}
        render={({ field, fieldState: { invalid, isTouched, error } }) => (
            <BaseSelect
                {...props}
                value={field.value}
                onIonChange={event => field.onChange(event.detail.value ?? '')}
                onIonBlur={field.onBlur}
                className={`${invalid ? 'ion-invalid' : 'ion-valid'} ${isTouched && 'ion-touched'} ${props.className}`}
            >
                {props.children}
            </BaseSelect>
        )}
    />) : <BaseSelect {...props}>{props.children}</BaseSelect>

}
