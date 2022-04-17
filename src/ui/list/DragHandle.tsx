import Icon from "../icon/Icon";
import { DragHandleOptions } from "./dragHandle";
import styles from './DragHandle.module.css';

export type DragHangleProps = {
    options: DragHandleOptions
}

export default function DragHandle(props: DragHangleProps) {
    return (<span {...props.options.listeners} {...props.options.attributes} className={styles.handle}><Icon name="drag"></Icon></span>)

}