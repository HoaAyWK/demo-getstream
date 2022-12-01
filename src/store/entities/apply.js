import { createSlice, createAsyncThunk, combineReducers } from '@reduxjs/toolkit';
import { ACTION_STATUS } from '../../common/consts';
import api from '../../app/api';

const initialAppliesByJob = {
    applies: [],
    status: ACTION_STATUS.IDLE
};


export const getAppliesByJob = createAsyncThunk(
    'applies/getAppliesByJob',
    async (jobId) => {
        const { data } = await api.get(`/applied/jobs/${jobId}`);

        return data;
    }
)
;

const getAppliesByJobSlice = createSlice({
    name: 'getAppliesByJob',
    initialState: initialAppliesByJob,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAppliesByJob.pending, (state, action) => {
                state.status = ACTION_STATUS.IDLE;
            })
            .addCase(getAppliesByJob.fulfilled, (state, action) => {
                state.status = ACTION_STATUS.SUCCESSEED;
                state.applies = action.payload.applieds;
            })
            .addCase(getAppliesByJob.rejected, (state, action) => {
                state.status = ACTION_STATUS.FAILED
            })
    }
});

const appliesReducer = combineReducers({
    getAppliesByJob: getAppliesByJobSlice.reducer
});

export default appliesReducer;

