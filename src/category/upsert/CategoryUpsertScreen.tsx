import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { useSelector } from "react-redux";
import {  useHistory, useParams } from "react-router";
import { toCommonErrorMessage } from "../../error/error.service";
import { useAppDispatch } from "../../store";
import { Right } from "../../user/user";
import { hasRight } from "../../user/user.slice";
import { Category } from "../category";
import { removeCategory, selectCategory, selectError, selectLoading, upsertCategory } from "../category.slice";
import CategoryForm from "./CategoryForm";
import { CategoryUpsertTopbar } from "./CategoryUpsertTopbar";


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
    

    return (<IonPage>
      <IonHeader>
        <CategoryUpsertTopbar title={title} onRemove={onRemove} hasDeleteRights={hasDeleteRights} />
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
            <CategoryUpsertTopbar title={title} onRemove={onRemove} hasDeleteRights={hasDeleteRights} />
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