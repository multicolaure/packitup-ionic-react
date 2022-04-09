import { createAsyncThunk, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { CommonError, getCommonErrorFromMessage } from '../error/common-errors';
import { RootState } from '../store';
import { selectUser } from '../user/user.slice';
import { Category } from './category';
import { upsertCategory as doUpsertCategory,
    removeCategory as doRemoveCategory,
    reorderCategories as doReorderCategories,
    upsertCategories as doUpsertCategories,
    getCategories as doGetCategories } from './category.service';


const categoryEntityAdapter = createEntityAdapter<Category>({
    sortComparer: (a: Category, b: Category) => (a.order ?? 0) - (b.order ?? 0),
});

const initialState: CategorySliceState = categoryEntityAdapter.getInitialState({
    loading: false,
    error: undefined,
});

type CategorySliceState = EntityState<Category> & {
    loading: boolean,
    error?: CommonError,
};

export const upsertCategory = createAsyncThunk<Category, Category, { state: RootState }>('category/upsertOne', (category: Category, { getState }) => {
    const user = selectUser(getState());
    return doUpsertCategory(category, user);
});

export const removeCategory = createAsyncThunk<string, string, { state: RootState }>('category/removeOne', (categoryId: string, { getState }) => {
    const user = selectUser(getState());
    return doRemoveCategory(categoryId, user);
});

export const reorderCategories = createAsyncThunk<Array<Category>, Array<Category>, { state: RootState }>('category/reorder',
    (categories: Array<Category>, { getState , dispatch}) => {
    const updatedCategories = doReorderCategories(categories);
    dispatch(categorySlice.actions.updateOrder(updatedCategories));
    const user = selectUser(getState());
    return doUpsertCategories(updatedCategories, user);
});

export const fetchCategories = createAsyncThunk<Category[], void, { state: RootState }>('category/fetchCategories', (_, { getState }) => {
    const user = selectUser(getState());
    return doGetCategories(user);
});


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        updateOrder(state, action: PayloadAction<Array<Category>>) {
            categoryEntityAdapter.upsertMany(state, action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(upsertCategory.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(upsertCategory.fulfilled, (state, action) => {
                state.loading = false;
                categoryEntityAdapter.upsertOne(state, action);
            })
            .addCase(upsertCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = getCommonErrorFromMessage(action.error.message);
            })
            .addCase(removeCategory.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.loading = false;
                categoryEntityAdapter.removeOne(state, action.payload);
            })
            .addCase(removeCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = getCommonErrorFromMessage(action.error.message);
            })
            .addCase(reorderCategories.pending, (state) => {
                state.error = undefined;
            })
            .addCase(reorderCategories.fulfilled, (state, action) => {
                categoryEntityAdapter.upsertMany(state, action.payload);
            })
            .addCase(reorderCategories.rejected, (state, action) => {
                state.error = getCommonErrorFromMessage(action.error.message);
            })
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                categoryEntityAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = getCommonErrorFromMessage(action.error.message);
            })
    }
});

const getCategoriesState = (state: RootState) => state.category;

const categoriesSelectors = categoryEntityAdapter.getSelectors<RootState>(getCategoriesState);

export const selectLoading = (state: RootState) => {
    return getCategoriesState(state).loading;
}

export const selectError = (state: RootState) => {
    return getCategoriesState(state).error;
}

export const selectCategory = (id: string | undefined) => {
    return (state: RootState) =>
        id ? categoriesSelectors.selectById(state, id) : undefined;
}

export const { selectAll: selectAllCategories, selectById: selectCategoryById } = categoriesSelectors;

export default categorySlice.reducer;