import { IonButton, IonButtons, IonNote, IonText } from "@ionic/react";
import Icon from "../Icon";
import { IconName } from "../icon";
import styles from "./IconPickerList.module.css";

export type IconPickerListProps = {
    icons: Array<IconName>,
    onClickIcon?: (icon: IconName) => void
}


export function IconPickerList({icons, onClickIcon}: IconPickerListProps) {
    return (
        <ul className={styles.grid}>
            {icons.map(icon => 
                <li className={styles.element}>
                    <IonButton fill="clear" className={styles.button} color="medium"
                        onClick={() => onClickIcon?.(icon)}>
                        <Icon name={icon} size="2rem" slot="icon-only"></Icon>
                    </IonButton></li>
            )}
        </ul>)
}