import { ReactNode } from 'react';
import { DragHandleOptions } from './dragHandle';
import SortableItem from './SortableItem';
import SortableList, { SortableListProps } from './SortableList';
import VirtualList, { VirtualListProps } from './VirtualList';


export type RenderOptions = {
    dragHandleOptions?: DragHandleOptions,
}

export type InteractiveListProps<TItem> = 
Omit<SortableListProps<TItem>, "children">
& Omit<VirtualListProps<TItem>, "renderItem">
& {
    renderItem: (item: TItem, index: number, options: RenderOptions) => ReactNode,
};


function InteractiveList<TItem>({
    items,
    itemHeight, 
    renderItem, 
    getItem, 
    getId = (item: TItem) => (item as any).id,
    onSort}: InteractiveListProps<TItem>) {

    const renderSortableItem = (item: TItem, index: number) => {
        const itemId = getId(item);
        return (
            <SortableItem id={itemId}
                renderItem={(dragHandleOptions) => renderItem(item, index, {dragHandleOptions})}>
            </SortableItem>
        );
    };

    return (
        <SortableList
            items={items}
            getId={getId}
            onSort={onSort}
            getItem={getItem}
            renderOverlay={(item, index) => renderItem(item, index, {})}>
            <VirtualList
            items={items} 
            itemHeight={itemHeight}
            renderItem={renderSortableItem}
            getItem={getItem}></VirtualList>
        </SortableList>
    );
};

export default InteractiveList;