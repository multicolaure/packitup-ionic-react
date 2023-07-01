import { IonCol, IonGrid, IonRow, IonSelectOption } from "@ionic/react";
import Input from "../../ui/form/Input";
import { FrequencyUnit } from "../stuff";
import styles from "./FrequencyPicker.module.css";
import Select from "../../ui/form/Select";
import { useRef } from "react";

export type UsageFrequencyFieldValue = {
    nbStuffs: any,
    frequency: any,
    unit: any
}

export type FrequencyPickerProps = {
    value?: UsageFrequencyFieldValue,
    onChange?: (frequency: UsageFrequencyFieldValue) => void
    onBlur?: () => void
}

const emptyForm: UsageFrequencyFieldValue = {
    nbStuffs: 1,
    frequency: 1,
    unit: FrequencyUnit.trip
}

export default function FrequencyPicker(props: FrequencyPickerProps) {

    const usageFrequency = useRef(emptyForm);

    const handleChange = (fieldName: keyof UsageFrequencyFieldValue, value: string | undefined | null) => {
        usageFrequency.current = {
            ...usageFrequency.current,
            [fieldName]: value
        };
        props.onChange?.(usageFrequency.current);
    }

    return (
    <IonGrid>
        <IonRow class="ion-align-items-center">
            <IonCol>
                <Input name="nbStuffs" type="number" onIonInput={event => handleChange('nbStuffs', event.detail.value)} onIonBlur={props?.onBlur}/>
            </IonCol>
            <IonCol size="auto" className={styles.label}>every</IonCol>
            <IonCol>
                <Input name="frequency" type="number" onIonInput={event => handleChange('frequency', event.detail.value)} onIonBlur={props?.onBlur}/>
            </IonCol>
            <IonCol size="6">
                <Select name="unit" aria-label="Frequency unit" onIonChange={event => handleChange('unit', event.detail.value)} onIonBlur={props?.onBlur}>
                    {Object.keys(FrequencyUnit).map(unit =>
                        <IonSelectOption value={unit} key={unit} aria-label={unit}>{unit}</IonSelectOption>
                    )}
                </Select>
            </IonCol>
        </IonRow>
    </IonGrid>
    );
}