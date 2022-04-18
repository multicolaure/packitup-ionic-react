import MdiIcon from '@mdi/react';
import { IconName } from './icon';
import icons from './icons-list';

export type IconProps = {
    name: IconName,
    size?: number | string,
    slot?: string,
}

export default function Icon({name, size = 1}: IconProps) {

    const path = icons[name];
    return (
        path ? <MdiIcon path={path} size={size} ></MdiIcon> : null
    )
}