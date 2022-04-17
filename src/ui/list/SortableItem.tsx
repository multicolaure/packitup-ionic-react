import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ElementType, ReactNode } from 'react';
import { DragHandleOptions } from './dragHandle';
import styles from './SortableItem.module.css';

export type SortableItemProps = {
    id: string,
    renderItem: (options: DragHandleOptions) => ReactNode,
    children?: ReactNode,
    element?: ElementType,
}

export default function SortableItem({id, renderItem, element}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  const Element = element || 'div';
  
  return (
    <Element ref={setNodeRef} className={isDragging ? styles.dragging : undefined} style={style}>
      {renderItem({listeners, attributes})}
    </Element>
  );
}