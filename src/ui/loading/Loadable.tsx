import { IonSpinner } from "@ionic/react";
import React from "react";
import { ReactNode } from "react";

export type LoadableProps = {
    loading: boolean,
    children?: ReactNode
} 

const Loadable = ({ loading, children}: LoadableProps) => {

    if (loading) {
        return (
            <div className="piu-middle">
                <IonSpinner name="circles" color="primary"></IonSpinner>
                <span className="ion-margin-start">Loading...</span>
            </div>
        );
    }
    return (<React.Fragment>{children}</React.Fragment>)
}

export default Loadable;