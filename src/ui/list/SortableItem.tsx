import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode } from 'react';
import styles from './SortableItem.module.css';

export type SortableItemProps = {
    id: string,
    children: ReactNode,
}

export default function SortableItem({id, children}: SortableItemProps) {
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
  
  return (
    <div ref={setNodeRef} className={isDragging ? styles.dragging : undefined} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}