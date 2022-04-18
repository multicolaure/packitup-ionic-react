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
    readRoute?: string,
    editRoute?: string,
    deleteRoute?: string,
}


export default function CategoryListItem({category, dragHandleOptions, readRoute, editRoute}: CategoryListItemProps) {

    const hasReadRights = useSelector(hasRight(category, Right.read));
    const hasEditRights = useSelector(hasRight(category, Right.update));
    const hasDeleteRights = useSelector(hasRight(category, Right.delete));

    return (
        <IonItem routerLink={hasEditRights ? editRoute : (hasReadRights ? readRoute : undefined)}
            routerDirection="forward">
            <IonLabel>
                {category.name}
            </IonLabel>
            <IonNote slot="start">
                <Icon name={category.icon}></Icon>
            </IonNote>
            <IonNote slot="end">
                <DragHandle options={dragHandleOptions}></DragHandle>
            </IonNote>
        </IonItem>
    )
}