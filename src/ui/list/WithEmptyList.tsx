import React, { ReactNode } from "react";


export type WithEmptyListProps = {
    data?: Array<any>,
    noData: React.ComponentType<any>,
    children: ReactNode,
}


export default function WithEmptyList(props: WithEmptyListProps) {

    if (!props.data || props.data.length === 0) {
        return (<props.noData></props.noData>);
    }
    else {
        return (<React.Fragment>{props.children}</React.Fragment>);
    }

}