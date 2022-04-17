import Icon from "../icon/Icon";
import { DragHandleOptions } from "./dragHandle";

export type DragHangleProps = {
    options: DragHandleOptions
}

export default function DragHandle(props: DragHangleProps) {
    return (<span {...props.options.listeners} {...props.options.attributes}><Icon name="drag"></Icon></span>)

}