import SortableItem from './SortableItem';
import SortableList, { SortableListProps } from './SortableList';
import VirtualList, { VirtualListProps } from './VirtualList';


export type InteractiveListProps<TItem> = 
Omit<SortableListProps<TItem>, "children">
& VirtualListProps<TItem>;


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
            <SortableItem id={itemId}>
                {renderItem(item, index)}
            </SortableItem>
        );
    };

    return (
        <SortableList
            items={items}
            getId={getId}
            onSort={onSort}
            getItem={getItem}
            renderOverlay={renderItem}>
            <VirtualList
            items={items} 
            itemHeight={itemHeight}
            renderItem={renderSortableItem}
            getItem={getItem}></VirtualList>
        </SortableList>
    );
};

export default InteractiveList;