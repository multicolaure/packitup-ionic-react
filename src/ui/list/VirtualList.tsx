

import { ReactNode } from 'react';
import TinyVirtualList from 'react-tiny-virtual-list';
import AutoSizer from 'react-virtualized-auto-sizer';


export type VirtualListProps<TItem> = {
    items: Array<TItem>,
    itemHeight: number,
    renderItem: (item: TItem, index: number) => ReactNode,
    getItem?: (index: number) => TItem,
}


function VirtualList<TItem>({
    items,
    itemHeight, 
    renderItem, 
    getItem = (index: number) => items[index]
}: VirtualListProps<TItem>) {

    return (
        <AutoSizer>
            {({height, width}) => (
                <TinyVirtualList
                    width={width + 'px'}
                    height={height}
                    itemSize={itemHeight}
                    itemCount={items.length}
                    renderItem={({index, style}) =>
                        <div key={index} style={style}>
                            {renderItem(getItem(index), index)}
                        </div>
                    }
                ></TinyVirtualList>
            )}
        </AutoSizer>
    );
};

export default VirtualList;