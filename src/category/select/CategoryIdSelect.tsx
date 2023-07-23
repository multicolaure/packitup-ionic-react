import { IonSelectOption } from "@ionic/react";
import { useEffect } from "react";
import { FieldValues, Path } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import Select, { SelectProps } from "../../ui/form/Select";
import { fetchCategories, selectAllCategories, selectLoading } from "../category.slice";


export type CategorySelectProps<TFieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>> = SelectProps<TFieldValues, TName>;


export default function CategoryIdSelect<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>(
    props: CategorySelectProps<TFieldValues, TName>) {

    const loading = useSelector(selectLoading);

    const categories = useSelector(selectAllCategories);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    return <Select {...props} loading={loading}>
        {categories.map(category =>
            <IonSelectOption value={category.id} key={category.id} aria-label={category.name}>{category.name}</IonSelectOption>
        )}
    </Select>
}