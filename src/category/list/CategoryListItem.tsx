import { IonItem, IonLabel, IonNote } from "@ionic/react";
import { useSelector } from "react-redux";
import Icon from "../../ui/icon/Icon";
import DragHandle from "../../ui/list/DragHandle";
import { DragHandleOptions } from "../../ui/list/dragHandle";
import { Right } from "../../user/user";
import { hasRight } from "../../user/user.slice";
import { Category } from "../category";


export type CategoryListItemProps = {
    category: Category,
    dragHandleOptions?: DragHandleOptions,
    onRead?: () => void,
    onEdit?: () => void,
    onDelete?: () => void,
}


export default function CategoryListItem({category, dragHandleOptions}: CategoryListItemProps) {

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
            <IonNote slot="end">
                {dragHandleOptions ? <DragHandle options={dragHandleOptions}></DragHandle> : <Icon name="drag"></Icon>}
            </IonNote>
        </IonItem>
    )
}