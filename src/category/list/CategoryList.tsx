import { IonButton } from "@ionic/react";
import { useEffect, ReactNode } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import InteractiveList from "../../ui/list/InteractiveList";
import WithEmptyList from "../../ui/list/WithEmptyList";
import Loadable from "../../ui/loading/Loadable"
import { fetchCategories, selectAllCategories, selectLoading } from "../category.slice";
import CategoryListItem from "./CategoryListItem";



const CategoryList = () => {

    const loading = useSelector(selectLoading);
    const categories = useSelector(selectAllCategories);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);


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
                data={categories}
                itemHeight={55}
                renderItem={(item) => <CategoryListItem category={item}></CategoryListItem>}
                ></InteractiveList>
            </WithEmptyList>
        </Loadable>
    )
};

export default CategoryList;
