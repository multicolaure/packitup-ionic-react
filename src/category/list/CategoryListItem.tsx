import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonNote } from "@ionic/react";
import { useSelector } from "react-redux";
import Icon from "../../ui/icon/Icon";
import DragHandle from "../../ui/list/DragHandle";
import { DragHandleOptions } from "../../ui/list/dragHandle";
import { Right } from "../../user/user";
import { hasRight } from "../../user/user.slice";
import { Category } from "../category";
import { trash } from "ionicons/icons";


export type CategoryListItemProps = {
    category: Category,
    dragHandleOptions?: DragHandleOptions,
    readRoute?: string,
    editRoute?: string,
    onDelete?: (category: Category) => void,
}


export default function CategoryListItem({category, dragHandleOptions, readRoute, editRoute, onDelete}: CategoryListItemProps) {

    const hasReadRights = useSelector(hasRight(category, Right.read));
    const hasEditRights = useSelector(hasRight(category, Right.update));
    const hasDeleteRights = useSelector(hasRight(category, Right.delete));

    const handleRemove = () => {
        if(onDelete) {
            onDelete(category);
        }
    }

    return (
        <IonItemSliding>
            <IonItem lines="full" routerLink={hasEditRights ? editRoute : (hasReadRights ? readRoute : undefined)}
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

            {hasDeleteRights && <IonItemOptions>
                <IonItemOption color="danger"><IonIcon icon={trash} slot="icon-only" onClick={handleRemove}></IonIcon></IonItemOption>
            </IonItemOptions>}
        </IonItemSliding>
    )
}