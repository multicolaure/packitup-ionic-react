import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export type DragHandleListeners = SyntheticListenerMap | undefined;
export type DragHandleAttributes = DraggableAttributes;
export type DragHandleOptions = {
    listeners: DragHandleListeners,
    attributes: DragHandleAttributes
}