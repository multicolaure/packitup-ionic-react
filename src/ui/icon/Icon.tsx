import MdiIcon from '@mdi/react';
import icons from './icons-list';

export type IconProps = {
    name: string
}

export default function Icon({name}: IconProps) {

    const path = icons[name];
    return (
        path ? <MdiIcon path={path} size={1}></MdiIcon> : null
    )
}