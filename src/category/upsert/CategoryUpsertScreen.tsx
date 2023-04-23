import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage } from "@ionic/react";
import { trash } from "ionicons/icons";
import { useSelector } from "react-redux";
import {  useHistory, useParams } from "react-router";
import { toCommonErrorMessage } from "../../error/error.service";
import TopBar from "../../navigation/TopBar";
import { useAppDispatch } from "../../store";
import { Right } from "../../user/user";
import { hasRight } from "../../user/user.slice";
import { Category } from "../category";
import { removeCategory, selectCategory, selectError, selectLoading, upsertCategory } from "../category.slice";
import CategoryForm from "./CategoryForm";

const CategoryUpsertScreen = () => {

    const { id: categoryId } = useParams<{id: string}>();

    const loading = useSelector(selectLoading);
    const savedCategory = useSelector(selectCategory(categoryId));
    const errorMessage = toCommonErrorMessage(useSelector(selectError));

    const hasDeleteRights = useSelector(hasRight(savedCategory, Right.delete));

    const dispatch = useAppDispatch();
    const history = useHistory();

    const onSave = (category: Category) => {
        if (category) {
            dispatch(upsertCategory(category))
                .then(({ meta }) => {
                    if (meta.requestStatus === "fulfilled") {
                        history.goBack();
                    }
            });
        }
    };

    const onRemove = () => {
        if(savedCategory?.id) {
            dispatch(removeCategory(savedCategory?.id))
                .then(({ meta }) => {
                    if (meta.requestStatus === "fulfilled") {
                        history.goBack();
                    }
                });
        }
    }

    const title = savedCategory ? `Edit ${savedCategory.name ?? 'category'}` : 'New category';
    const renderTopbar = () => (
        <TopBar title={title} toBack={true} defaultBackRoute="/categories">
            {hasDeleteRights && 
                <IonButtons slot="end">
                    <IonButton onClick={onRemove}>
                        <IonIcon slot="icon-only" icon={trash}></IonIcon>
                    </IonButton>
                </IonButtons>}
        </TopBar>
    )

    return (<IonPage>
      <IonHeader>
        {renderTopbar()}
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
            {renderTopbar()}
        </IonHeader>
        <main className="ion-padding">
            <CategoryForm
                category={savedCategory}
                onSave={onSave}
                saving={loading}
                errorMessage={errorMessage}></CategoryForm>
        </main>
      </IonContent>
    </IonPage>)
};

export default CategoryUpsertScreen;