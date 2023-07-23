import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { CommonError, getCommonErrorFromMessage } from '../error/common-errors';
import { RootState } from '../store';
import { selectUser } from '../user/user.slice';
import { Stuff } from './stuff';
import { upsertStuff as doUpsertStuff, removeStuff as doRemoveStuff, getStuffs as doGetStuffs } from './stuff.service';


const stuffEntityAdapter = createEntityAdapter<Stuff>({
});

const initialState: StuffSliceState = stuffEntityAdapter.getInitialState({
    loading: false,
    error: undefined,
});

type StuffSliceState = EntityState<Stuff> & {
    loading: boolean,
    error?: CommonError,
};

export const upsertStuff = createAsyncThunk<Stuff, Stuff, { state: RootState }>('stuff/upsertOne', (stuff: Stuff, { getState }) => {
    const user = selectUser(getState());
    return doUpsertStuff(stuff, user);
});

export const removeStuff = createAsyncThunk('stuff/removeOne', (stuffId: string) => {
    return doRemoveStuff(stuffId);
});

export const fetchStuffs = createAsyncThunk<Stuff[], void, { state: RootState }>('stuff/fetchStuffs', (_, { getState }) => {
    const user = selectUser(getState());
    return doGetStuffs(user);
});


export const stuffSlice = createSlice({
    name: 'stuff',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(upsertStuff.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(upsertStuff.fulfilled, (state, action) => {
                state.loading = false;
                stuffEntityAdapter.upsertOne(state, action);
            })
            .addCase(upsertStuff.rejected, (state, action) => {
                state.loading = false;
                state.error = getCommonErrorFromMessage(action.error.message);
            })
            .addCase(removeStuff.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(removeStuff.fulfilled, (state, action) => {
                state.loading = false;
                stuffEntityAdapter.removeOne(state, action.payload);
            })
            .addCase(removeStuff.rejected, (state, action) => {
                state.loading = false;
                state.error = getCommonErrorFromMessage(action.error.message);
            })
            .addCase(fetchStuffs.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchStuffs.fulfilled, (state, action) => {
                state.loading = false;
                stuffEntityAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchStuffs.rejected, (state, action) => {
                state.loading = false;
                state.error = getCommonErrorFromMessage(action.error.message);
            })
    }
});

const getStuffsState = (state: RootState) => state.stuff;

const stuffsSelectors = stuffEntityAdapter.getSelectors<RootState>(getStuffsState);

export const selectLoading = (state: RootState) => {
    return getStuffsState(state).loading;
}

export const selectError = (state: RootState) => {
    return getStuffsState(state).error;
}

export const selectStuff = (id: string | undefined) => {
    return (state: RootState) =>
        id ? stuffsSelectors.selectById(state, id) : undefined;
}

export const { selectAll: selectAllStuffs, selectById: selectStuffById } = stuffsSelectors;

export default stuffSlice.reducer;