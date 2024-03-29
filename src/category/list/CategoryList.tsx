import { IonButton } from "@ionic/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import InteractiveList, { RenderOptions } from "../../ui/list/InteractiveList";
import WithEmptyList from "../../ui/list/WithEmptyList";
import Loadable from "../../ui/loading/Loadable";
import { Category } from "../category";
import { fetchCategories, removeCategory, reorderCategories, selectAllCategories, selectLoading } from "../category.slice";
import CategoryListItem from "./CategoryListItem";



const CategoryList = () => {

    const loading = useSelector(selectLoading);
    const categories = useSelector(selectAllCategories);

    const dispatch = useAppDispatch();

    const onReorder = (newCategories: Array<Category>) => {
        dispatch(reorderCategories(newCategories))
    }

    const getNewRoute = () => {
        return "/category";
    };

    const getUpdateRoute = (category: Category) => {
        return "/category/" + category.id!;
    };

    const handleDelete = (category: Category) => {
        if(category.id) {
            dispatch(removeCategory(category.id));
        }
    }

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    const NoCategory = () => {
        return (
            <div className="piu-middle">
                <p>No category yet !</p>
                <IonButton routerLink={getNewRoute()}>Add a new category</IonButton>
            </div>
        );
    }


    const ListItem = (item: Category, index: number, {dragHandleOptions}: RenderOptions) => 
        <CategoryListItem
            category={item}
            dragHandleOptions={dragHandleOptions}
            readRoute={getUpdateRoute(item)}
            editRoute={getUpdateRoute(item)}
            onDelete={handleDelete}></CategoryListItem>

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
