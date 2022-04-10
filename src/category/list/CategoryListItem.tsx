import { IonItem, IonLabel, IonNote } from "@ionic/react";
import { useSelector } from "react-redux";
import Icon from "../../ui/icon/Icon";
import { Right } from "../../user/user";
import { hasRight } from "../../user/user.slice";
import { Category } from "../category";


export type CategoryListItemProps = {
    category: Category,
    onRead?: () => void,
    onEdit?: () => void,
    onDelete?: () => void,
}


export default function CategoryListItem({category}: CategoryListItemProps) {

    const hasReadRights = useSelector(hasRight(category, Right.read));
    const hasEditRights = useSelector(hasRight(category, Right.update));
    const hasDeleteRights = useSelector(hasRight(category, Right.delete));

    return (
        <IonItem>
            <IonLabel>
                {category.name}
            </IonLabel>
            <IonNote slot="start">
                <Icon name={category.icon}></Icon>
            </IonNote>
        </IonItem>
    )
}