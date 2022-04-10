import { IonButton } from "@ionic/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import InteractiveList from "../../ui/list/InteractiveList";
import WithEmptyList from "../../ui/list/WithEmptyList";
import Loadable from "../../ui/loading/Loadable";
import { Category } from "../category";
import { fetchCategories, reorderCategories, selectAllCategories, selectLoading } from "../category.slice";
import CategoryListItem from "./CategoryListItem";



const CategoryList = () => {

    const loading = useSelector(selectLoading);
    const categories = useSelector(selectAllCategories);

    const dispatch = useAppDispatch();

    const onReorder = (newCategories: Array<Category>) => {
        dispatch(reorderCategories(newCategories))
    }

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    const NoCategory = () => {
        return (
            <div className="piu-middle">
                <p>No category yet !</p>
                <IonButton>Add a new category</IonButton>
            </div>
        );
    }
    return (
        <Loadable loading={loading}>
            <WithEmptyList noData={NoCategory} data={categories}>
                <InteractiveList
                items={categories}
                itemHeight={55}
                renderItem={(item) => <CategoryListItem category={item}></CategoryListItem>}
                onSort={onReorder}
                ></InteractiveList>
            </WithEmptyList>
        </Loadable>
    )
};

export default CategoryList;
