

import {
    closestCenter, DndContext, DragEndEvent,
    DragOverlay,
    DragStartEvent, TouchSensor, MouseSensor, useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    restrictToVerticalAxis,
    restrictToWindowEdges
} from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { ReactNode, useState } from 'react';
import styles from './SortableList.module.css';


export type SortableListProps<TItem> = {
    items: Array<TItem>,
    onSort?: (sortedItems: Array<TItem>) => void,
    getId?: (item: TItem) => string,
    renderOverlay?: (item: TItem, index: number) => ReactNode,
    getItem?: (index: number) => TItem, // necessary when using overlay
    children: ReactNode,
}



function SortableList<TItem>({
    items, 
    getId = (item: TItem) => (item as any).id,
    onSort,
    renderOverlay,
    getItem = (index: number) => items[index],
    children}: SortableListProps<TItem>) {

    const itemsIds = items.map(item => getId(item));
    const [activeItemOldIndex, setActiveItemOldIndex] = useState<number | null>(null);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );

    const onDragStart = ({active}: DragStartEvent) => {
        const oldIndex = itemsIds.indexOf(active.id);
        setActiveItemOldIndex(oldIndex);        
    }

    const onDragCancel = () => {
        setActiveItemOldIndex(null);        
    }

    const onDragEnd = ({active, over}: DragEndEvent) => {
    
        if (over?.id && active.id !== over?.id) {
            const oldIndex = itemsIds.indexOf(active.id);
            const newIndex = itemsIds.indexOf(over?.id);
            
            const itemsCopy = arrayMove(items, oldIndex, newIndex);
            onSort?.(itemsCopy);
        }

        setActiveItemOldIndex(null);
    };

    const doRenderOverlay = () => {
        if(activeItemOldIndex !== null && renderOverlay) {
            return (
                <div className={styles.dragOverlay}>
                {renderOverlay(getItem(activeItemOldIndex), activeItemOldIndex)}
                </div>
            )
        }
        return null;
    }

    return (

    <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
    >
        <SortableContext 
            items={itemsIds}
            strategy={verticalListSortingStrategy}
        >
            {children && children}
        </SortableContext>
        {renderOverlay && 
            <DragOverlay>
                {doRenderOverlay()}
            </DragOverlay>}
    </DndContext>
    );
};

export default SortableList;