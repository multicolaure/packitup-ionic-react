import { IonButton } from "@ionic/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import InteractiveList, { RenderOptions } from "../../ui/list/InteractiveList";
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

    const upsertRoute = (category: Category) => {
        return "/category/" + category.id!;
    };

    const ListItem = (item: Category, index: number, {dragHandleOptions}: RenderOptions) => 
        <CategoryListItem
            category={item}
            dragHandleOptions={dragHandleOptions}
            readRoute={upsertRoute(item)}
            editRoute={upsertRoute(item)}></CategoryListItem>

    return (
        <Loadable loading={loading}>
            <WithEmptyList noData={NoCategory} data={categories}>
                <InteractiveList
                items={categories}
                itemHeight={55}
                renderItem={ListItem}
                onSort={onReorder}
                ></InteractiveList>
            </WithEmptyList>
        </Loadable>
    )
};

export default CategoryList;
