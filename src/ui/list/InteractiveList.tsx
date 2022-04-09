

import { ReactNode } from 'react';
import VirtualList from 'react-tiny-virtual-list';
import AutoSizer from 'react-virtualized-auto-sizer';


export type InteractiveListProps<TItem> = {
    data: Array<TItem>,
    itemHeight: number,
    renderItem: (item: TItem, index: number) => ReactNode,
    getItem?: (index: number) => TItem
}



export default function InteractiveList<TItem>({data, itemHeight, renderItem, getItem: customGetItem}: InteractiveListProps<TItem>) {


    const defaultGetItem = (index: number) => data[index];
    const getItem = customGetItem ?? defaultGetItem;

    return (
    <AutoSizer>
        {({height, width}) => (
            <VirtualList
                width={width + 'px'}
                height={height}
                itemSize={itemHeight}
                itemCount={data.length}
                renderItem={({index, style}) =>
                    <div key={index} style={style}>
                        {renderItem(getItem(index), index)}
                    </div>
                }
            ></VirtualList>
        )}
    </AutoSizer>
    );
};