import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { useSelector } from "react-redux";
import {  useHistory, useParams } from "react-router";
import { toCommonErrorMessage } from "../../error/error.service";
import { useAppDispatch } from "../../store";
import { UpsertTopbar } from "../../ui/topbar/UpsertTopbar";
import { Right } from "../../user/user";
import { hasRight } from "../../user/user.slice";
import { Stuff } from "../stuff";
import { removeStuff, selectStuff, selectError, selectLoading, upsertStuff } from "../stuff.slice";
import StuffForm from "./StuffForm";


const StuffUpsertScreen = () => {

    const { id: stuffId } = useParams<{id: string}>();

    const loading = useSelector(selectLoading);
    const savedStuff = useSelector(selectStuff(stuffId));
    const errorMessage = toCommonErrorMessage(useSelector(selectError));

    const hasDeleteRights = useSelector(hasRight(savedStuff, Right.delete));

    const dispatch = useAppDispatch();
    const history = useHistory();

    const onSave = (stuff: Stuff) => {
        if (stuff) {
            dispatch(upsertStuff(stuff))
                .then(({ meta }) => {
                    if (meta.requestStatus === "fulfilled") {
                        history.goBack();
                    }
            });
        }
    };

    const onRemove = () => {
        if(savedStuff?.id) {
            dispatch(removeStuff(savedStuff?.id))
                .then(({ meta }) => {
                    if (meta.requestStatus === "fulfilled") {
                        history.goBack();
                    }
                });
        }
    }

    const title = savedStuff ? `Edit ${savedStuff.name ?? 'stuff'}` : 'New stuff';
    

    return (<IonPage>
      <IonHeader>
        <UpsertTopbar title={title} onRemove={onRemove} hasDeleteRights={hasDeleteRights} defaultBackRoute="/" />
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
            <UpsertTopbar title={title} onRemove={onRemove} hasDeleteRights={hasDeleteRights} defaultBackRoute="/" />
        </IonHeader>
        <main className="ion-padding">
            <StuffForm
                stuff={savedStuff}
                onSave={onSave}
                saving={loading}
                errorMessage={errorMessage}></StuffForm>
        </main>
      </IonContent>
    </IonPage>)
};

export default StuffUpsertScreen;